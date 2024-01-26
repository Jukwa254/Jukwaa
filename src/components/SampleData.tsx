{
  /* <div className="p-4 lg:p-6 rounded-xl flex flex-col h-full  ">
<div className="grid grid-cols-3 lg:block items-center w-full border-BackgroundOne ">
  <button
    onClick={onClose}
    className="md:hidden my-2 py-2.5 rounded-full "
  >
    <div className="flex gap-2 items-center font-medium rounded-full ">
      <BackIcon />
      <p className="font-bold">Back</p>
    </div>
  </button>
  <p className="font-bold text-lg text-center lg:text-left ">
    Post
  </p>
</div>
<div className="mt-4 flex-1">
  <div className="flex gap-4 items-center">
    <img
      src={selectedCard.post_image}
      alt=""
      className="w-16 h-16 object-cover rounded-full"
    />
    <div>
      <p className="text-2xl font-bold">
        {selectedCard.profiles?.user_name}
      </p>
      <p className="text-xs text-[#796552]">
        {formatDistanceToNow(new Date(selectedCard.created_at), {
          // addSuffix: true,
        })}{" "}
        ago
      </p>
    </div>
  </div>
  
  <h1 className="uppercase font-semibold text-xl py-2 mt-4">
    {selectedCard.post_title}
  </h1>
  <p className="text-base">{paragraphs}</p>
  <img
    src={selectedCard.post_image}
    alt=""
    className="h-80 w-full rounded-lg object-cover my-4"
  />
  {/* COmment Form */
}
//   <div className="">
//     <form onClick={handleSubimtComment}>
//       <div className="flex ">
//         <p
//           className="text-sm items-center flex gap-1 font-bold cursor-pointer border bg-[#6C2D1B] px-2.5 py-1.5 text-BackgroundTwo rounded-full"
//           onClick={toggleComment}
//         >
//           <AddIcon />
//           <span>Post Comment</span>
//         </p>
//       </div>
//       <div>
//         {isCommenting && (
//           <div className="mt-4">
//             <textarea
//               value={commentDescription}
//               ref={textareaRef}
//               rows={2}
//               placeholder="Post Your Comment"
//               onChange={(e) =>
//                 setCommentDescription(e.target.value)
//               }
//               className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-[#6C2D1B]"
//               style={{
//                 overflow: "hidden",
//               }}
//             />
//             <div className="mt-2 flex justify-end">
//               <button
//                 type="submit"
//                 className="flex items-center gap-2 px-4 py-2 bg-[#6C2D1B] text-BackgroundAccent rounded-full hover:bg-[#57281b] font-bold"
//               >
//                 <SendIcon />
//                 <p>Post</p>
//               </button>
//             </div>
//           </div>
//         )}
//       </div>
//     </form>
//     <div className="w-full bg-BackgroundAccent h-0.5 my-4"></div>
//   </div>

//   <div className="">
//     {selectedCard.comments.map((cards, index) => (
//       <div key={index}>
//         <div className="py-2 border-b">
//           <div className="flex gap-2 items-center">
//             <img
//               src={selectedCard.post_image}
//               alt=""
//               className="w-8 h-8 rounded-full "
//             />
//             <div className="">
//               <p className="font-semibold">
//                 {cards.user_id.user_name}
//               </p>
//               <p className="text-xs text-[#796552]">
//                 {formatDistanceToNow(
//                   new Date(cards.created_at),
//                   {}
//                 )}{" "}
//                 ago
//               </p>
//             </div>
//           </div>
//           <p className="text-textThree font-normal text-base">
//             {cards.comment_description}
//           </p>
//           <div className="flex justify-between items-center mt-2">
//             <div className="flex gap-4 text-sm text-[#414141] items-center">
//               <div
//                 className="flex items-center gap-1 cursor-pointer font-bold"
//                 onClick={handleLike}
//               >
//                 <span className="text-sm">
//                   {liked ? <LikeFilled /> : <LikeRegular />}
//                 </span>

//               </div>
//               <div
//                 className="flex items-center gap-1 cursor-pointer font-bold"
//                 onClick={handleDislike}
//               >
//                 <span className="text-sm">
//                   {disliked ? (
//                     <ThumbsDownFilled />
//                   ) : (
//                     <ThumbsDownRegular />
//                   )}
//                 </span>

//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     ))}
//   </div>
// </div>
// </div>
