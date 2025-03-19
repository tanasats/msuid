"use server"

import { cookies } from "next/headers";
import { IUser } from "../interfaces/user";

const api_server = process.env.API_SERVER;
// interface IUser {
//   id?:number;
//   username:string;
//   fullname:string;
//   mail:string;
//   usertype?:string;
//   staffid?:string;
//   faculty?:string;
//   citizenid?:string;
//   created?:string;
//   updated?:string;
// }

// type TUser = {
//   id:number,
//   username:string,
//   fullname:string,
//   mail:string,
//   usertype?:string,
//   staffid?:string,
//   faculty?:string,
//   citizenid?:string,
//   created:string,
//   updated:string  
// }

// 📌 เรียกข้อมูล pagging 
export const getUser = async (page: number, limit: number, orderby: string) => {
  try {
    const res = await fetch(`${api_server}/user?page=${page}&limit=${limit}&orderby=${orderby}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        // Authorization: `Bearer ${accesstoken}`,
      },
    });
    if (!res) return ({ message: "Failed to fetch users" });
    const data = await res.json();
    return data;

  } catch (error) {
    console.error("Error fetching users:", error);
  }
}

export const getByUsername = async (username: string) => {
  const xaccesstoken = (await cookies()).get("token")?.value;
  //const accesstoken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InRhbmFzYXQiLCJmdWxsbmFtZSI6IuC4meC4suC4ouC4mOC4meC4qOC4suC4quC4leC4o-C5jCDguKrguLjguJTguIjguKPguLTguIciLCJ1c2VydHlwZSI6InN0YWZmIiwibWFpbCI6InRhbmFzYXQuc0Btc3UuYWMudGgiLCJ1aWQiOiI1MDAyNjU4IiwiaWF0IjoxNzQxODE0NzgyLCJleHAiOjE3NDE4MTgzODIsImlzcyI6InRhbmFzYXQuc0Btc3UuYWMudGgifQ.ajinIzGYvfo_D2_p_Gk0einmTo_69e2eLAzb6sY9fnk";
  try {
    const res = await fetch(`${api_server}/user/${username}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        //authorization: `Bearer ${accesstoken}`,
        "x-access-token": `${xaccesstoken}`,
      },
    });
    if (!res) return ({ message: "Failed to fetch users" });
    const data = await res.json();
    return data;

  } catch (error) {
    console.error("Error fetching users:", error);
    return error
  }
}

export const deleteUser = async (id: number) => {
  try {
    const res = await fetch(`${api_server}/user/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        // Authorization: `Bearer ${accesstoken}`,
      },
    });
    if (!res) return ({ message: "Failed to DELETE users" });
    const data = await res.json();
    console.log(data)
    return data;
  } catch (error) {
    return ({ message: "Failed to UPDATE users", error });
  }
}

export const insertUser = async (user: IUser) => {
  try {
    const res = await fetch(`${api_server}/user`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // Authorization: `Bearer ${accesstoken}`,
      },
      body: JSON.stringify(user),
    });
    if (!res) return ({ message: "Failed to INSERT users" });
    const data = await res.json();
    return data;
  } catch (error) {
    return ({ message: "Failed to INSERT users:", error });
  }

}

export const updateUser = async (user: IUser) => {
  try {
    //delete user.created;
    //delete user.updated;
    const res = await fetch(`${api_server}/user`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        // Authorization: `Bearer ${accesstoken}`,
      },
      body: JSON.stringify(user),
    });
    if (!res) return ({ message: "Failed to UPDATE users" });
    const data = await res.json();
    return data;
  } catch (error) {
    return ({ message: "Failed to UPDATE users", error });
  }
}