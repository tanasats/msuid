"use server"

import { IStaff } from "../interfaces/staff";

const api_server = process.env.API_SERVER;
const api_staff_server = process.env.API_STAFF_SERVER;
const api_token = process.env.API_STAFF_TOKEN;



export const getStaffAll = async () => {
  try {
    const res = await fetch(`${api_staff_server}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
         Authorization: `Bearer ${api_token}`,
      },
    });
    console.log("res=",res);
    if (!res) return ({ message: "Failed to fetch users" });
    const data = await res.json();
    return data;

  } catch (error) {
    console.error("Error fetching users:", error);
  }
}

export const insertStaff = async (staff: IStaff) => {
  try {
    const res = await fetch(`${api_server}/staff`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // Authorization: `Bearer ${accesstoken}`,
      },
      body: JSON.stringify(staff),
    });
    if (!res) return ({ message: "Failed to INSERT staff" });
    const data = await res.json();
    return data;
  } catch (error) {
    return ({ message: "Failed to INSERT staff:", error });
  }

}