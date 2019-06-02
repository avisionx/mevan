function populateData(user) {

  const db = firebase.firestore();
  
  db.collection("users").doc(user.uid).get().then(function(snapshot) {

    for (var i = 0; i < snapshot.data().courseRegs.length; i++) {
      snapshot.data().courseRegs[i].get().then(function(doc) {
        
        data = doc.data();
        var courseName = data.name;
        var courseCode = data.code;
        var courseDescription = data.courseDesc;
        var imgUrl = data.img;
        var courseId = doc.id;

        data.prof.get().then(function(doc2) {
        
          data2 = doc2.data();
          profName = data2.name;

          s = '<div class="col-12 col-md-4 my-4" id="' + courseId + '"><div class="card w-100"><img class="card-img-top img-fluid px-1 pt-1" src="' + imgUrl + '" alt="Card image cap"><div class="card-body px-3"><h5 class="card-title mb-0 font-weight-bold">' + courseName + '</h5><p class="mb-2 mt-0 text-success small">' + courseCode + '</p><p class="card-text mb-1" style="font-size: 14px;">Professor: ' + profName + '</span></p><p class="card-text font-weight-light">' + courseDescription + '</p><a href="" onclick="viewCourse(\'' + courseId + '\'); event.preventDefault()" class="btn btn-primary shadow-none">View</a></div></div></div>';
          $("#populateRow").html($("#populateRow").html() + s)
        
        });
      });
    }
  });

  $("#loader").slideUp(); 
}

function viewCourse(courseId) {
  
  alert("Open Course Content")

  // const db = firebase.firestore();
  // const user = firebase.auth().currentUser;
  // var docRef = db.collection("users").doc(user.uid);
  
  // docRef.get().then(function(doc) { 
    
  //   data = doc.data();
    
  //   for (var i = 0; i < data.courseRegs.length; i++) {
      
  //     if(courseId === data.courseRegs[i].id) {
  //       alert("You are already registered to this course!");
  //       break;
  //     }
  //     else {
  //       if(data.courseRegs.length >= 3) {
  //         alert("You can't register more than 3 courses!");
  //         break;
  //       }
  //       else{
  //         alert("Your request has been recorded!");
  //         break;
  //       }
  //     }
      

  //   }

  // });

}