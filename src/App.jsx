import { useEffect, useState } from "react";
import io from "socket.io-client";

const socket = io("https://chat-app-server-bu2s.onrender.com");

function App() {
  const [username, setUsername] = useState("");
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  const sendMessage = () => {
    if (message.trim() !== "") {
      const msgData = { username, message, time: new Date().toLocaleTimeString() };
      socket.emit("send_message", msgData);
      setMessage("");
    }
  };

  const handlerSubmitNickname= (e)=>{
    const inputValue = e.target.nickname.value
    setUsername(inputValue)
  }

  useEffect(() => {
    socket.on("receive_message", (data) => {
      setMessages((prev) => [...prev, data]);
    });

    return () => socket.off("receive_message");
  }, []);

  if (!username) {
    return (
      <div className="h-screen flex justify-center items-center bg-gradient-to-r from-purple-400 to-pink-500">
        <div className="bg-white p-8 rounded-lg shadow-xl">
          <h2 className="text-xl font-bold mb-4">Enter your name</h2>
         <form className="flex justify-center gap-2" onSubmit={handlerSubmitNickname} action="">
           <input 
           name="nickname"
            type="text"
            className="border p-2 rounded w-full"
          /> 
          <button className="btn px-5 py-2 rounded bg-blue-500 text-white" type="submit">set</button>
         </form>
        </div>
      </div>
    );
  }

  return (
    // <div className="h-screen flex flex-col justify-between bg-gray-100">
    //   <div className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white text-center py-4 text-2xl font-bold">
    //     Welcome, {username}
    //   </div>

    //   <div className="flex-1 overflow-y-auto p-4 space-y-2">
    //     {messages.map((msg, i) => (
    //       <div
    //         key={i}
    //         className={`p-3 rounded-lg max-w-xs ${
    //           msg.username === username ? "ml-auto bg-blue-500 text-white" : "bg-white shadow"
    //         }`}
    //       >
    //         <div className="text-sm font-semibold">{msg.username}</div>
    //         <div>{msg.message}</div>
    //         {/* <div className="text-xs text-right text-gray-400">{msg.time}</div> */}
    //       </div>
    //     ))}
    //   </div>

    //   <div className="flex p-4 bg-white shadow">
    //     <input
    //       type="text"
    //       className="flex-1 border rounded-l p-2"
    //       placeholder="Type a message..."
    //       value={message}
    //       onChange={(e) => setMessage(e.target.value)}
    //       onKeyDown={(e) => e.key === "Enter" && sendMessage()}
    //     />
    //     <button
    //       onClick={sendMessage}
    //       className="bg-blue-500 text-white px-4 rounded-r hover:bg-blue-600"
    //     >
    //       Send
    //     </button>
    //   </div>
    // </div>
    <div
  className="h-screen lg:w-1/2 mx-auto flex flex-col justify-between bg-cover bg-center"
  style={{
    backgroundImage: `url('https://png.pngtree.com/background/20230625/original/pngtree-valentine-s-gesture-in-smartphone-chat-a-3d-mockup-of-a-picture-image_4043329.jpg')`,
  }}
>
   <div className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white text-center py-4 text-2xl font-bold bg-opacity-70 backdrop-blur-md">
    Welcome, {username}
  </div>

  <div className="flex-1 overflow-y-auto p-4  space-y-2 backdrop-blur-md bg-white/10">
    {messages.map((msg, i) => (
      <div
        key={i}
        className={`p-3 rounded-lg max-w-xs ${
          msg.username === username
            ? "ml-auto bg-blue-500/80 text-white backdrop-blur-md"
            : "bg-white/30 text-black backdrop-blur-md shadow"
        }`}
      >
        <div className="text-sm font-semibold">{msg.username}</div>
        <div>{msg.message}</div>
        {/* <div className="text-xs text-right text-gray-400">{msg.time}</div> */}
      </div>
    ))}
  </div>

  <div className="flex p-4 bg-white/20 backdrop-blur-md shadow-md">
    <input
      type="text"
      className="flex-1 border-none outline-none bg-white/30 text-black p-2 rounded-l placeholder-gray-700"
      placeholder="Type a message..."
      value={message}
      onChange={(e) => setMessage(e.target.value)}
      onKeyDown={(e) => e.key === "Enter" && sendMessage()}
    />
    <button
      onClick={sendMessage}
      className="bg-blue-600 text-white px-4 rounded-r hover:bg-blue-700"
    >
      Send
    </button>
  </div>
</div>

  );
}

export default App;
