"use server"

import { cookies } from "next/headers";

const api_server = process.env.API_SERVER;


export const getUserCertInfo = async () => {
    const xaccesstoken = (await cookies()).get("token")?.value;
    console.log("x-access-token: ",xaccesstoken);
    try {
        const response = await fetch(`${api_server}/cert`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
             "x-access-token": `${xaccesstoken}`,
          },
        });
        if (response.status==200){
            const data = await response.json();
            console.log("data=",data);
            return data;
        }else{
            //const err = await response.json();
            return ({error:true, message: response.statusText}); 
        }
      } catch (error) {
        console.error("Error fetching users:", error);
        return error
      }
};

export const getUserCertFile = async () =>{
    const xaccesstoken = (await cookies()).get("token")?.value;
    const response = await fetch(`${api_server}/cert/download`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
           "x-access-token": `${xaccesstoken}`,
        },
      });
      //console.log(response);
      const filename = response.headers.get('content-disposition')?.split('filename=')[1].toString().replaceAll('"',"");
      //console.log("filename:",filename);
      return {filename:filename,data:response.blob()};

};