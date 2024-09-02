import { cookies } from "next/headers";
import Link from "next/link";
import { redirect } from "next/navigation";

export default function Navbar() {
  const isLoggedin = cookies().get("Authorization")?.value ? true : false;
  console.log(isLoggedin);

  async function handleLogout() {
    "use server";
    console.log("LOGOUT");

    cookies().delete("Authorization");
    redirect("/");
  }
  return (
    <>
      <div className="navbar bg-base-100">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
            >
              <li>
                <Link href={"/products"}>All Product</Link>
              </li>
              <li>
                <Link href={"/wishlists"}>My Wishlists</Link>
              </li>
              <li>
                <a>MEN</a>
              </li>
              <li>
                <a>WOMEN</a>
              </li>
              <li>
                <a>KIDS</a>
              </li>

              <li>
                <a>EQUIPMENT</a>
              </li>
              <li>
                <a>SALE</a>
              </li>
            </ul>
          </div>
          <Link href="/" className="btn btn-ghost text-xl">
            <img src="/assets/logoNav.png" alt="" className="w-24" />
          </Link>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">
            <li>
              <details>
                <summary>
                  <Link href={"/products"}>All Product</Link>
                </summary>
              </details>
            </li>
            <li>
              <details>
                <summary>
                  <Link href={"/wishlists"}>My Wishlists</Link>
                </summary>
              </details>
            </li>
            <li>
              <details>
                <summary>MEN</summary>
              </details>
            </li>
            <li>
              <details>
                <summary>WOMEN</summary>
              </details>
            </li>
            <li>
              <details>
                <summary>KIDS</summary>
              </details>
            </li>
            <li>
              <details>
                <summary>EQUIPMENT</summary>
              </details>
            </li>
            <li>
              <a>SALE</a>
            </li>
          </ul>
        </div>
        <div className="navbar-end">
          <div className="flex gap-2">
            <div className="dropdown dropdown-end">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost btn-circle avatar"
              >
                <div className="w-10 rounded-full">
                  <img
                    alt="Tailwind CSS Navbar component"
                    src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                  />
                </div>
              </div>
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
              >
                {isLoggedin ? (
                  <li>
                    <form action={handleLogout} className="w-full flex">
                      <button type="submit" className="w-full flex-1">
                        Logout
                      </button>
                    </form>
                  </li>
                ) : (
                  <li className="w-full flex">
                    <Link
                      className="w-full flex-1 justify-center"
                      href={"/login"}
                    >
                      Login
                    </Link>
                  </li>
                )}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
