"use server";

import { revalidatePath } from "next/cache";

export async function createReviewAction(formData: FormData) {
  const bookId = formData.get("bookId")?.toString();
  const content = formData.get("content")?.toString();
  const author = formData.get("author")?.toString();

  if (!bookId || !content || !author) {
    return;
  }

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_SERVER_URL}/review`,
      {
        method: "POST",
        body: JSON.stringify({ bookId, content, author }),
      }
    );
    console.log(response.status);
    /**
     * 주의1. 오직 서버측에서만 호출할 수 있는 메서드(클라이언트 컴퍼넌트에서 호출X)
     * 주의2. 페이지에 포함된 모든 캐시들도 무효화된다.(페이지 재생성)
     * 주의3. 풀 라우트 캐시까지 함꼐 삭제된다.
     */
    revalidatePath(`/book/${bookId}`);
  } catch (err) {
    console.error(err);
    return;
  }
}
