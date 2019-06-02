function populateData(user) {

  const db = firebase.firestore();
  
  db.collection("profs").get().then(function(querySnapshot) {
    querySnapshot.forEach(function(doc) {
        
        data = doc.data();

        var profName = data.name;
        var profDes = data.designation;
        var profEmail = data.email;
        var profPhone = data.phone;
        var profOffice = data.office;
        var profId = doc.id;
        var profImg = data.image;

        s = '<div class="col-12 col-md-3 my-3"><div class="card"><img class="card-img-top" src="' + profImg +'" alt="" ><div class="card-body pt-2"><h5 class="card-title mb-0 mt-1">' +  profName + '</h5><p class="card-text text-secondary small mb-2">' + profDes + '</p><p class="card-text text-dark font-weight-light mb-1" style="font-size: 14px;">Email: <span class="text-secondary">'+ profEmail +'</span></p><p class="card-text text-dark font-weight-light mb-1" style="font-size: 14px;">Phone: <span class="text-secondary">' + profPhone + '</span></p><p class="card-text text-dark font-weight-light mb-3" style="font-size: 14px;">Office: <span class="text-secondary">' + profOffice + '</span></p><a href="#" class="btn btn-primary shadow-none btn-sm w-100" onclick="openModal(\'' + profId + '\');">View Profile</a></div></div></div></div>';
        $("#populateRow").html($("#populateRow").html() + s);
          
      });
  });

  $("#loader").slideUp(); 
}

function openModal(profId) {

  $('#modalPorf').modal({show: true});
  
  const db = firebase.firestore();

  var docRef = db.collection("profs").doc(profId);
  
  docRef.get().then(function(doc) { 
    
    data = doc.data();

    $('#profImg').attr('src', data.image)
    $('#profName').html(data.name)
    $('#profDes').html(data.designation)
    $('#profEmail').html(data.email)
    $('#profPhone').html(data.phone)
    $('#profOffice').html(data.office)
    $('#profEdu').html(data.education)
    $('#profInt').html(data.interests)

    for(var i = 0; i < data.comments.length; i++){
      s = '<li class="list-group-item border-0 pl-0 py-1 text-secondary" style="font-size:15px;"><i class="fa fa-comment" aria-hidden="true"></i> ' + data.comments[i] + '.</li>';
      $("#profComments").html($("#profComments").html() + s);
    }

  });

}