let api_data;

function getData() {
  var settings = {
    url: "https://gorest.co.in/public/v2/users",
    method: "GET",
    timeout: 0,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization:
        "Bearer 9fac04b014b1d01f3a9bb3f24c6ba401c6b2972ca7f7389232c37caead8f3f3c",
    },
    data: JSON.stringify({
      name: "Allasani Peddana",
      email: "allasani.peddana@15ce.com",
      status: "active",
    }),
  };

  $.ajax(settings).done(function (response) {
    printData(response);
  });
}

function printData(data) {
  console.log(data);
  api_data = data;

  let table = ` <div class="row">
        <div class="col">
            <table class="table text-center mt-5">
                <thead class="bg-dark text-white">
                  <tr>
                    <th scope="col">Id</th>
                    <th scope="col">Name</th>
                    <th scope="col">Email</th>
                    <th scope="col">Gender</th>
                    <th scope="col">Status</th>
                    <th scope="col"></th>
                    <th scope="col"></th>
                  </tr>
                </thead>
                <tbody>`;

  let tr = "";

  for (let i of data) {
    tr = tr + `<tr>`;
    tr = tr + `<td>${i.id}</td>`;
    tr = tr + `<td>${i.name}</td>`;
    tr = tr + `<td>${i.email}</td>`;
    tr = tr + `<td>${i.gender}</td>`;
    tr = tr + `<td>${i.status}</td>`;
    tr =
      tr +
      `<td><button class="btn btn-primary" value="${i.id}" onclick="updateData(this.value)">Update</button></td>`;
    tr =
      tr +
      `<td><button class="btn btn-primary" id="deleteData" value="${i.id}" onclick="deleteData(this.value)">Delete</button></td>`;
    tr = tr + `</tr>`;
  }

  table =
    table +
    tr +
    `</tbody>
            </table>
        </div>
        </div>`;

  //   console.log(table);
  //   $("#table").remove();
  $("#table").html(table);
}

function addData() {
  let name = $("#eName").val();
  let email = $("#eEmail").val();
  let gender = $("input[name=flexRadioDefault]:checked").val();
  let status = $("input[name=Status]:checked").val();

  var settings = {
    url: "https://gorest.co.in/public/v2/users",
    method: "POST",
    timeout: 0,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization:
        "Bearer 9fac04b014b1d01f3a9bb3f24c6ba401c6b2972ca7f7389232c37caead8f3f3c",
    },
    data: JSON.stringify({
      name: name,
      email: email,
      gender: gender,
      status: status,
    }),
  };

  $.ajax(settings).done(function (response) {
    console.log(response);
  });
}

function deleteData(id) {
  console.log("hello");
  var settings = {
    url: "https://gorest.co.in/public/v2/users/" + id,
    method: "DELETE",
    timeout: 0,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization:
        "Bearer 9fac04b014b1d01f3a9bb3f24c6ba401c6b2972ca7f7389232c37caead8f3f3c",
    },
  };

  $.ajax(settings).done(function (response) {
    getData();
  });
}

function updateData(id) {
  let name = $("#eName").val();
  let email = $("#eEmail").val();
  let gender = $("input[name=flexRadioDefault]:checked").val();
  let status = $("input[name=Status]:checked").val();

  for (let i of api_data) {
    if (i.id == id) {
      name = i.name;    
      email = i.email;
      // gender = i.gender;
      // status = i.status;
    }
  }

  var settings = {
    url: "https://gorest.co.in/public/v2/users/" + id,
    method: "PATCH",
    timeout: 0,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization:
        "Bearer 9fac04b014b1d01f3a9bb3f24c6ba401c6b2972ca7f7389232c37caead8f3f3c",
    },
    data: JSON.stringify({
      name: name,
      email: email,
      gender: gender,
      status: status,
    }),
  };

  $.ajax(settings).done(function (response) {
    getData();
  });
}

// getData();

$("#getData").click(function () {
  getData();
});

$("#addData").click(function () {
  addData();
  getData();
});

// $("#deleteData").click(function(){
//     deleteData();
//     // getData();
// });
