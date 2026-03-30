import TopBar from "./TopBar";
import MainHeader from "./MainHeader";
import Navbar from "./Navbar";

export function Header() {
  return (
    <header className="w-full flex flex-col z-50">
      <TopBar />
      <MainHeader />
      <Navbar />
    </header>
  );
}
