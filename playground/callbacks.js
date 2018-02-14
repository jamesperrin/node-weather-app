var getUser = (id, callback) => { 
  var user = {
    id: id,
    name: "Vikram"
  };

  console.log("Start");
 
  setTimeout(() => {
    callback(user);
  }, 3000);

  console.log("End");
};

getUser(31, (userObj) => { 
  console.log(userObj);
});