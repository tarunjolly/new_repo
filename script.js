

$(document).ready(function () {
    let player = {};
    let other = {};
    let socket = io('ws://localhost:5000');


    //$(".tictactoe").attr("disabled", "disabled").off('click');

    //$('#message').append(`<span>${da}</span>`);




    $(".gamebtn").click(function () {
        console.log("clicked");
        $(`#${this.id}`).text("x")
        console.log(this.value)
    });

    // socket.emit('connection',function(){

    // })


    $("#newgame").click(function () {
        let getName = $("#newgamename").val();



        if (getName != '') {
            console.log(getName);
            console.log(socket.id)
            player = {
                socketId: socket.id,
                playerName: getName,
                symbol: 'o',
                roomName: 'room' + socket.id

            }
            console.log(player);

            socket.emit('create', player);





            $("#starting").css("display", "none");
            $(".tictactoe").css("display", "block");

            //  $(".tictactoe").addClass("disabledbutton");


        }

    });


    $("#joingame").click(function () {
        let otherPlayer = $("#joingamename").val();
        let roomid = $("#joinroom").val();
        //console.log("roomid" +roomid);
        //check if room exist 


        socket.emit('checkRoomExist', roomid);


        socket.on('existVerified', function (data) {
            console.log(data);
            if (data === true) {
                player = {
                    socketId: socket.id,
                    playerName: otherPlayer,
                    symbol: 'x',
                    roomName: roomid,
                }



                socket.emit('create', player);
                socket.emit('setopponent', roomid);
                socket.emit("make_move",socket.id);

                socket.on('hey',function(data){
                    console.log(data);
                    $('#message').val(data);
                })
    

            }
            console.log(player);


            socket.emit('get', roomid);

            socket.on('out', function (data) {
                console.log(data);
            })
            


            

        })

       




        $("#starting").css("display", "none");
        $(".tictactoe").css("display", "block");
        //        $(".tictactoe").removeClass("disabledbutton");
        //console.log("into " +socket.id);



        // console.log(player);

    })


    $("#start").click(()=>{
        
            // socket.on('connectToRoom',function(data) {
            //     $('#message').append(`<span>${data}</span>`);
            //  });
    })



});
