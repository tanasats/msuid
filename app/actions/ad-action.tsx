"use server";

const api_server = process.env.API_SERVER;

export const fetchADUser = async (ou:string) => {
    try {
        const res = await fetch(`${api_server}/ad/user/${ou}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
             //Authorization: `Bearer ${api_token}`,
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