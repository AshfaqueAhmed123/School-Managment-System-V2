import { Outlet } from "react-router-dom";
import * as DialogPrimitive from "@radix-ui/react-dialog"
import { Sidebar } from "../components";
import {Link} from "react-router-dom"
import ChatBot from "@/components/custom/chatbot/ChatBot";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import Bot from "../../../assets/bot.png"

const BaseLayout = () => {
  return (
    <main className="page-wrapper">
      {/* left of page */}
      <Sidebar />
      <div className="w-20 h-42 bg-transparent fixed bottom-0 right-0 mr-3 my-2 mb-5 animate-bounce overflow-hidden flex items-center justify-center rounded-md cursor-pointer transition-all hover:scale-105" style={{zIndex:"1000"}}>
          <Dialog>
            <DialogTrigger className="flex items-center bg-transparent">
              <img src={Bot} style={{width:"100%", height:"100%", objectFit:"cover"}} alt="Bot" />
            </DialogTrigger>
            <DialogContent className="bg-[#383854] text-white">
              <DialogHeader>
                <DialogTitle className="mb-3 mx-3 flex items-center justify-around">
                  <span className="text-xl capitalize">AI ChatBot</span> 
                  <Link to={"/admin/AIChatBot"}>
                      <DialogPrimitive.Close>
                          <button className="btn capitalize">
                              go full screen
                          </button>
                      </DialogPrimitive.Close>
                  </Link>
                  
                </DialogTitle>
                <DialogDescription className="h-[80vh] overflow-scroll">
                  <ChatBot endpoint={"/admin"} token={localStorage.getItem("adminToken")}/>
                </DialogDescription>
              </DialogHeader>
            </DialogContent>
          </Dialog>
      </div>
      {/* right side/content of the page */}
      <div className="content-wrapper">
        <Outlet />
      </div>
    </main>
  );
};

export default BaseLayout;
