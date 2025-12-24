function Message() {
  const name = "jiayang";
  if (name) {
    return (
      <h1 className="font-bold hover:scale:1 align-bottom l">hello {name}</h1>
    );
  } else {
    return <h1 className="font-bold">No Name</h1>;
  }
}

export default Message;
