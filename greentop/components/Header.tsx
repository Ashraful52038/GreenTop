
"use client";

import { useUser } from "@clerk/nextjs";


function Header() {
  const { user } = useUser();
  console.log(user);
  return (
    <header className="flex flex-wrap justify-between items-center px-4 py-2">
       
       {/* top row*/}
       <div>
        <Link href="/"
        
        className="text-2xl 
        font-bold
         text-green-600">
          GreenTop   
        
        
        
        >Shop-Now</Link>
       </div>
        
        
        
        </header>
       
  );
}

export default Header;