// import { ShoppingCart, UserPlus, LogIn, LogOut, Lock } from "lucide-react";
// import { Link } from "react-router-dom";

// const Navbar = () => {
//   const user = false;
//   const isAdmin = false;

//   return (
//     <header className="fixed top-0 left-0 w-full bg-[#0A0A23] bg-opacity-90 backdrop-blur-md shadow-xl z-40 border-b border-[#1B1B2F]">
//       <div className="container mx-auto px-4 py-3">
//         <div className="flex justify-between items-center">
//           <Link
//             to="/"
//             className="text-2xl font-extrabold text-[#CDB4DB] tracking-wide flex items-center space-x-2"
//           >
//             <span>MoonCart</span>
//           </Link>

//           <nav className="flex items-center gap-5 text-sm font-medium">
//             <Link
//               to="/"
//               className="text-[#A6A6C3] hover:text-[#EAE6F8] transition duration-300"
//             >
//               Home
//             </Link>

//             {user && (
//               <Link
//                 to="/cart"
//                 className="relative group text-[#A6A6C3] hover:text-[#EAE6F8] transition duration-300"
//               >
//                 <ShoppingCart
//                   className="inline-block mr-1 group-hover:text-[#EAE6F8]"
//                   size={20}
//                 />
//                 <span className="hidden sm:inline">Cart</span>
//                 <span className="absolute -top-2 -left-2 bg-[#FF77E9] text-white rounded-full px-2 py-0.5 text-xs shadow-md">
//                   3
//                 </span>
//               </Link>
//             )}

//             {isAdmin && (
//               <Link
//                 to="/secret-dashboard"
//                 className="bg-[#6A0DAD] hover:bg-[#7e23c9] text-white px-3 py-1 rounded-md shadow-md flex items-center"
//               >
//                 <Lock className="inline-block mr-1" size={18} />
//                 <span className="hidden sm:inline">Dashboard</span>
//               </Link>
//             )}

//             {user ? (
//               <button className="bg-[#1E003C] hover:bg-[#320660] text-white px-4 py-2 rounded-md flex items-center">
//                 <LogOut size={18} />
//                 <span className="ml-2 hidden sm:inline">Log Out</span>
//               </button>
//             ) : (
//               <>
//                 <Link
//                   to="/signup"
//                   className="bg-[#4B0082] hover:bg-[#6A0DAD] text-white px-4 py-2 rounded-md flex items-center"
//                 >
//                   <UserPlus className="mr-2" size={18} />
//                   Sign Up
//                 </Link>

//                 <Link
//                   to="/login"
//                   className="bg-[#1B1B2F] hover:bg-[#2c2c4d] text-white px-4 py-2 rounded-md flex items-center"
//                 >
//                   <LogIn className="mr-2" size={18} />
//                   Login
//                 </Link>
//               </>
//             )}
//           </nav>
//         </div>
//       </div>
//     </header>
//   );
// };

// export default Navbar;

import { ShoppingCart, UserPlus, LogIn, LogOut, Lock } from "lucide-react";
import { Link } from "react-router-dom";
import { useUserStore } from "../stores/useUserStore";
import { useCartStore } from "../stores/useCartStore";

const Navbar = () => {
  const { user, logout } = useUserStore();
  const isAdmin = user?.role === "admin";
  const { cart } = useCartStore();

  return (
    <header className="fixed top-0 left-0 w-full bg-[#0A0A23] bg-opacity-90 backdrop-blur-md shadow-xl z-40 border-b border-[#1B1B2F]">
      <div className="container mx-auto px-4 py-3">
        <div className="flex justify-between items-center">
          <Link
            to="/"
            className="text-2xl font-extrabold text-[#CDB4DB] tracking-wide flex items-center space-x-2"
          >
            <span>MoonCart</span>
          </Link>

          <nav className="flex flex-wrap items-center gap-4">
            <Link
              to="/"
              className="text-[#A6A6C3] hover:text-[#EAE6F8] transition duration-300"
            >
              Home
            </Link>
            {user && (
              <Link
                to={"/cart"}
                className="relative group text-[#A6A6C3] hover:text-[#EAE6F8] transition duration-300
							ease-in-out"
              >
                <ShoppingCart
                  className="inline-block mr-1 group-hover:text-[#EAE6F8]"
                  size={20}
                />
                <span className="hidden sm:inline">Cart</span>
                {cart.length > 0 && (
                  <span
                    className="absolute -top-2 -left-2 bg-emerald-500 text-white rounded-full px-2 py-0.5 
									text-xs group-hover:bg-emerald-400 transition duration-300 ease-in-out"
                  >
                    {cart.length}
                  </span>
                )}
              </Link>
            )}
            {isAdmin && (
              <Link
                className="bg-[#6A0DAD] hover:bg-[#7e23c9] text-white px-3 py-1 rounded-md font-medium
								 transition duration-300 ease-in-out flex items-center"
                to={"/secret-dashboard"}
              >
                <Lock className="inline-block mr-1" size={18} />
                <span className="hidden sm:inline">Dashboard</span>
              </Link>
            )}

            {user ? (
              <button
                className="bg-[#1E003C] hover:bg-[#320660]  text-white py-2 px-4 
						rounded-md flex items-center transition duration-300 ease-in-out"
                onClick={logout}
              >
                <LogOut size={18} />
                <span className="hidden sm:inline ml-2">Log Out</span>
              </button>
            ) : (
              <>
                <Link
                  to={"/signup"}
                  className="bg-[#1B1B2F] hover:bg-[#2c2c4d] text-white py-2 px-4 
									rounded-md flex items-center transition duration-300 ease-in-out"
                >
                  <UserPlus className="mr-2" size={18} />
                  Sign Up
                </Link>
                <Link
                  to={"/login"}
                  className="bg-[#1B1B2F] hover:bg-[#2c2c4d]  text-white py-2 px-4 
									rounded-md flex items-center transition duration-300 ease-in-out"
                >
                  <LogIn className="mr-2" size={18} />
                  Login
                </Link>
              </>
            )}
          </nav>
        </div>
      </div>
    </header>
  );
};
export default Navbar;
