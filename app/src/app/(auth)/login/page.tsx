"use client";
import Link from "next/link";
import ErrorNotif from "@/components/ErrorNotif";
import { ChangeEvent, FormEvent, useState } from "react";
import { useRouter } from "next/navigation";


/**
 * kalau hit api dari client = cookies akan di handle otomatis
 * kalau hit api dari server (server action) = cookies harus di kirim / set manual
 *
 */

export default function Login({params, searchParams}:{params:string, searchParams:{errors:string}}) {
  /*
  Login menggunakan use server 
  // const handleLogin = async (formData: FormData) => {
  //   "use server";
  //   console.log({
  //     emai: formData.get("email"),
  //     password: formData.get("password"),
  //   });

  //   const data = {
  //     email: formData.get("email"),
  //     password: formData.get("password"),
  //   };

  //   const res = await fetch("http://localhost:3000/api/users/login", {
  //     method: "POST",
  //     body: JSON.stringify(data),
  //     headers: {
  //       "Content-Type": "application/json"
  //     }
  //   });
  // };

  // const response = await res.json();

  // if (!res.ok) {
  //   return redirect("/login?errors" + response.message);
  // }

  // console.log(response);
  // cookies().set("Authorization", `Bearer ${response.access_token}`);
  // redirect("/")  
  */

  //login menggunakan use client
  const router = useRouter();
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value,
    });
  };

  const handleSumbit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const res = await fetch(process.env.NEXT_PUBLIC_BASE_URL + "api/users/login", {
      method: "POST",
      body: JSON.stringify(user),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const response = await res.json();

    if (!res.ok) {
      return router.push("/login?errors=" + response.message);
    }

    alert("Berhasil Login");
    router.push("/");
    window.location.href='/'
  };

  return (
    <>
      <div className="hero bg-base-200 min-h-screen">
        <div className="hero-content flex-col lg:flex-row-reverse">
          <div className="text-center lg:text-left">
            <h1 className="text-5xl font-bold">Login now!</h1>
            <img
              src="/assets/SPORT.png"
              alt=""
              className="w-64 my-5 sm:mx-auto lg:mx-0"
            />
            <p className="py-0">
              Welcome Back! Were excited to see you again! Please log in to
              access your account and enjoy a seamless experience with all our
              services.
            </p>
          </div>
          <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
            <form className="card-body" onSubmit={handleSumbit}>
              <ErrorNotif error={searchParams.errors}/>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input
                  type="email"
                  name="email"
                  value={user.email}
                  onChange={handleChange}
                  placeholder="email"
                  className="input input-bordered"
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Password</span>
                </label>
                <input
                  type="password"
                  name="password"
                  value={user.password}
                  onChange={handleChange}
                  placeholder="password"
                  className="input input-bordered"
                />
                <label className="label">
                  <a href="#" className="label-text-alt link link-hover">
                    Forgot password?
                  </a>
                </label>
              </div>
              <div className="form-control mt-6">
                <button className="btn btn-primary">Login</button>
              </div>
              <p className="text-center">
                Tidak punya akun?
                <span>
                  <Link href="/register" className="text-blue-500">
                    {" "}
                    Daftar
                  </Link>
                </span>
              </p>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
