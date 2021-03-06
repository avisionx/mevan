function populateData(user) {

  const db = firebase.firestore();
  var docRef = db.collection("users").doc(user.uid);
  
  docRef.get().then(function(doc) { 
    
    data = doc.data();

    try {
      var firstTime = data.designation;
    }
    catch(err) {
      
      var counter = 0;
      
      db.collection("courses").limit(3).get().then(function (snapshot) {

        var arr = [];

        snapshot.docs.forEach(function (objectss) {
          arr.push(db.doc("/courses/" + objectss.id));
        });

        var sc1 = [
            Math.round(Math.random()*10) + "",
            Math.round(Math.random()*20) + "",
            Math.round(Math.random()*30) + "",
            Math.round(Math.random()*40) + "",
            Math.round(Math.random()*50) + "",
          ];
        sc1.sort(function(a, b) {
          return a - b;
        });
        var sc2 = [
                Math.round(Math.random()*7) + "",
                Math.round(Math.random()*22) + "",
                Math.round(Math.random()*36) + "",
                Math.round(Math.random()*38) + "",
                Math.round(Math.random()*45) + "",
              ];
        sc2.sort(function(a, b) {
          return a - b;
        });
        var sc3 = [
                Math.round(Math.random()*12) + "",
                Math.round(Math.random()*24) + "",
                Math.round(Math.random()*36) + "",
                Math.round(Math.random()*47) + "",
                Math.round(Math.random()*49) + "",
              ];
        sc3.sort(function(a, b) {
          return a - b;
        });

        db.collection("users").doc(user.uid).set({
          GPA: (Math.round(Math.random()*50)/10).toString(),
          courseCompleted: Math.round(Math.random()*3),
          courseData: [{
              progress: Math.round(Math.random()*70) + '%',
              scores: sc1,
            }, {
              progress: Math.round(Math.random()*40) + '%',
              scores: sc2,
            }, {
              progress: Math.round(Math.random()*80) + '%',
              scores: sc3,
          }],
          description: "Welcome to Mevan!",
          designation: "Student",
          courseRegs: arr,
        });

      });
      
    }

    docRef.get().then(function(doc) { 

      data = doc.data();
      $("#userName").html(user.displayName + '<span class="font-weight-light small text-secondary">(' + data.designation + ')</span>');
      $("#userDesc").html(data.description);    
      $("#userImage").attr("src", user.photoURL);
      $("#usergpa").html(data.GPA);
      var sumProg = 0;
      for (var i = data.courseData.length - 1; i >= 0; i--) {
        
        courseData = data.courseData[i];
        $("#courseSco" + eval(i+1)).html(courseData.progress + " Complete")
        $("#courseBar" + eval(i+1)).css("width", courseData.progress)
        
        sumProg += eval(courseData.progress.split("%")[0]);
        
        var c = 3;

        if(data.courseRegs.length > 0) {
          data.courseRegs[i].get().then(function(doc2) {
            
            data2 = doc2.data();

            $("#courseName" + eval(c)).html(data2.name);
            $("#courseCode_" + eval(c)).html(data2.code);
            $("#courseCode" + eval(c--)).html(data2.code);

          });
        }

      } 

      sumProg /= data.courseData.length;
      $("#hrsInvested").html(Math.round(sumProg/2) + "hrs");
      $("#courseCompleted").html(data.courseCompleted);
      $("#ongoingCourses").html(data.courseData.length);
      $("#backlog").html(Math.round((sumProg/2 - Math.round(sumProg/2))*10) + '%');
      
      populateChart(data);

    });

  });

  $("#loader").slideUp();
}

function populateChart(data) {
  
  
  var score1 = data.courseData[0].scores;
  var score2 = data.courseData[1].scores;
  var score3 = data.courseData[2].scores;

  var poData = [];

  for (var i = 1; i <= score1.length; i++) {
    var pushEle = {
      month: '2019-' + i,
      1: score1[i-1],
      2: score2[i-1],
      3: score3[i-1]
    }
    poData.push(pushEle);
  }

  Morris.Area({
    element: 'courseChart',
    data: poData,
    xkey: 'month',
    ykeys: ['1', '2', '3'],
    labels: ['1', '2', '3'],
    pointSize: 3,
    fillOpacity: 0,
    pointStrokeColors:['#DC3545', '#FFC107', '#17A2B8'],
    behaveLikeLine: true,
    gridLineColor: '#e0e0e0',
    lineWidth: 1,
    hideHover: 'auto',
    lineColors: ['#DC3545', '#FFC107', '#17A2B8'],
    resize: true    
  });

}
