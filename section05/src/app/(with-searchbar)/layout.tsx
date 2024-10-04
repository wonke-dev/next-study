import { ReactNode, Suspense } from "react";
import Searchbar from "../../components/searchbar";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        {/* 클라이언트 컴포넌트를 감싸주면 사전 렌더링 과정에서 배제됨 */}
        <Searchbar />
      </Suspense>

      {children}
    </div>
  );
}
