var currentUserKey = '';
var chatKey = '';
var db = firebase.database().ref('users');
var list = '';
var friend_id = '';
var shortMessage = '';
var arrList = '';

db.on('value', function (users) {
    list = '';
    users.forEach(function (data) {
        var user = data.val();
        if (user.email !== firebase.auth().currentUser.email) {      
            list += `<li class="list-bruh-items" id="${data.key}" onclick="StartChat('${data.key}', '${user.name}', '${user.photoURL}')">
                        <img class="imglistfrient" src="${user.photoURL}" alt="lol">
                            <div class="bruh-text">
                                <h4>${user.name}</h4>
                                <p id="shortMess">trống</p>
                            </div>
                        </li>`
                        //console.log(data.key);
        }
    });  
    document.getElementById('list-bruh').innerHTML = list;
    arrList = Array.from(document.querySelectorAll('.list-bruh-items'));
})

function changeColorList(id) {
    var chooseZone = document.getElementById(id);
    var otherZone = Array.from(document.querySelectorAll('.list-bruh-items'));

    for (let i in otherZone) {
        otherZone[i].classList.remove('active');
    }
    chooseZone.classList.add('active');
}

function onFirebaseStateChanged() {
    firebase.auth().onAuthStateChanged(onStateChanged);
}

function onStateChanged(user) {

    if (user) {
        document.getElementById('login-form').setAttribute('style', 'display: none');
        var userProfile = {
            email: '',
            name: '',
            photoURL: '',
        }
        userProfile.email = firebase.auth().currentUser.email;
        userProfile.name = firebase.auth().currentUser.displayName;
        userProfile.photoURL = firebase.auth().currentUser.photoURL;

        var db = firebase.database().ref('users');
        var check = false;

        db.on('value', function (users) {
            users.forEach(function (data) {
                var user = data.val();

                if (user.email === userProfile.email) {
                    currentUserKey = data.key;
                    check = true;
                }
            });

            if (check === false) {
                firebase.database().ref('users').push(userProfile, callback);
            } else {
                document.getElementById('chat-room').removeAttribute('style');
                document.getElementById('myname').innerHTML = firebase.auth().currentUser.displayName;
                document.getElementById('imgProfile').src = firebase.auth().currentUser.photoURL;
            }
            const messaging = firebase.messaging();

            navigator.serviceWorker.register('firebase-messaging-sw.js')
                .then((registration) => {
                    messaging.useServiceWorker(registration);

                    messaging.requestPermission().then(function () {
                        return messaging.getToken();
                    }).then(function (token) {
                        firebase.database().ref('fcmTokens').child(currentUserKey).set({ token_id: token });
                    })
                });
        })
        if (typeof (Storage) !== "undefined") {
            console.log(localStorage.reloaded);
            if (localStorage.reloaded === "true") {
                window.location.reload();
                localStorage.reloaded = "false";
            }
        } else {
            alert('Này bạn yêu quý, bạn có thể reload lại trang ko? web đang bị lỗi xíu, reload lại là hết!');
        }
    }
}

function callback(error) {
    if (error) {
        alert(error);
    }
    else {
        document.getElementById('chat-room').removeAttribute('style');
        document.getElementById('myname').innerHTML = firebase.auth().currentUser.displayName;
        document.getElementById('imgProfile').src = firebase.auth().currentUser.photoURL;
    }
}

function loginGoogle() {
    var provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(provider);
    localStorage.reloaded = "true";
}

function logout() {
    firebase.auth().signOut();
    document.getElementById('chat-room').setAttribute('style', 'display: none');
    document.getElementById('login-form').removeAttribute('style');
    localStorage.reloaded = "true";
}

function sendMessage() {
    var message = document.getElementById('txtMessage');
    var chatMessage = {
        userId: currentUserKey,
        msg: message.value,
        dateTime: new Date().toLocaleString()
    };
    if (message.value !== '') {
        if (document.getElementById('body-right').children.length >= 2) {
            message.value = '';
            firebase.database().ref('chatMessages').child(chatKey).push(chatMessage, function (error) {
                if (error) alert(error);
                else {
                    firebase.database().ref('fcmTokens').child(friend_id).once('value').then(function (data) {
                        //console.log(data.val().token_id);

                        $.ajax({
                            url: 'https://fcm.googleapis.com/fcm/send',
                            method: 'POST',
                            headers: {
                                'Content-type': 'application/json',
                                'Authorization': 'key=AAAAwsfIulY:APA91bGMvhmQje2sW4wI07ll32v_0_HOp0G6ysL8YPNgBwxdR6JOehsMUFootCWmjHTEn0rEy48cRLYHEShTbzXLXMsXCLdQHo-hY_AzPxt5rCzWIg57m_YCbV_Vvrhg3-u21bSpqL9r'
                            },
                            data: JSON.stringify({
                                 'to': data.val().token_id,  
                                 'data': { 'message': chatMessage.msg.substring(0, 30) + '...', 
                                 'icon': firebase.auth().currentUser.photoURL }
                            }),
                            success: function (response, className) {
                                console.log(response);
                            },
                            error: function (xhr, status, error) {
                                console.log(xhr.error);
                            }
                        });
                    });
                }
            });
        } else {
            if ((message.value === 'Brủh' || message.value === 'brủh' || message.value === 'Bruh' || message.value === 'bruh' || message.value === 'Bủh' || message.value === "bủh") && document.getElementById('sent-bruh') === null) {
                message.value = '';
                firebase.database().ref('chatMessages').child(chatKey).push(chatMessage, function (error) {
                    if (error) alert(error);
                    else {
                        firebase.database().ref('fcmTokens').child(friend_id).once('value').then(function (data) {
                            $.ajax({
                                url: 'https://fcm.googleapis.com/fcm/send',
                                method: 'POST',
                                headers: {
                                    'Content-type': 'application/json',
                                    'Authorization': 'key=AAAAwsfIulY:APA91bGMvhmQje2sW4wI07ll32v_0_HOp0G6ysL8YPNgBwxdR6JOehsMUFootCWmjHTEn0rEy48cRLYHEShTbzXLXMsXCLdQHo-hY_AzPxt5rCzWIg57m_YCbV_Vvrhg3-u21bSpqL9r'
                                },
                                data: JSON.stringify({
                                    'to': data.val().token_id, 'data': { 'message': chatMessage.msg.substring(0, 30) + '...', 'icon': firebase.auth().currentUser.photoURL }
                                }),
                                success: function (response) {
                                    console.log(response);                   
                                },
                                error: function (xhr, status, error) {
                                    console.log(xhr.error);
                                }
                            });
                        });
                    }
                });
            } else if (document.getElementById('sent-bruh') === null) {
                message.value = '';
                popupOpen("ĐÃ BRỦH CHƯA!");
            } else if (document.getElementById('sent-bruh') !== null) {
                message.value = '';
                popupOpen("ĐỢI NGƯỜI TA BRỦH LẠI ĐÃ!")
            }
        }
    }
}

function CheckpressEnter(e) {
    if (e.keyCode === 13) {
        sendMessage();
    }
}

function LoadChatMessage(chatKey, friendPhoto, id) {
    var db = firebase.database().ref('chatMessages').child(chatKey);
    db.on('value', function (chats) {
        var messageDisplay = '';
        shortMessage = document.querySelector(`#${id} #shortMess`);
        chats.forEach(function (data) {
            var chat = data.val();
            var dateTime = chat.dateTime.split(",");

            if (chat.userId !== currentUserKey) {
                if (chat.msg === 'Brủh' || chat.msg === 'brủh' || chat.msg === 'Bruh' || chat.msg === 'bruh' || chat.msg === 'Bủh' || chat.msg === "bủh") {
                    messageDisplay += `<div class="receive" id="receive-bruh"> 
                                    <img class="imgChat" src="${friendPhoto}" alt="lol">
                                    <span class="receive-text">
                                        <img class="bruh-image DaoNguoc" src="images/sasukeleft.png" alt="Lỗi load ảnh rồi ahuhu">
                                        <p class="bruh">Brủh</p>
                                        <span class="time" title="${dateTime[0]}">${dateTime[1]}</span>
                                    </span>
                                </div>`
                    checkBruhReceived = true;
                    shortMessage.innerHTML = "Vừa Brủh bạn!";
                } else {
                    messageDisplay += `<div class="receive"> 
                                    <img class="imgChat" src="${friendPhoto}" alt="lol">
                                    <span class="receive-text">
                                        <p>${chat.msg}</p>
                                        <span class="time" title="${dateTime[0]}">${dateTime[1]}</span>
                                    </span>
                                </div>`
                    shortMessage.innerHTML = chat.msg;        
                }
            } else {
                if (chat.msg === 'Brủh' || chat.msg === 'brủh' || chat.msg === 'Bruh' || chat.msg === 'bruh' || chat.msg === 'Bủh' || chat.msg === "bủh") {
                    messageDisplay += `<div class="sent" id="sent-bruh">
                        <img class="bruh-image DaoNguoc" src="images/bruh3.png" alt="Lỗi load ảnh rồi ahuhu">
                        <p class="bruh">Brủh</p>
                        <span class="time" title="${dateTime[0]}">${dateTime[1]}</span>
                    </div>`;
                    shortMessage.innerHTML = "Bạn đã Brủh!"
                } else {
                    messageDisplay += `<div class="sent">
                        <p>${chat.msg}</p>
                        <span class="time" title="${dateTime[0]}">${dateTime[1]}</span>
                    </div>`;
                    shortMessage.innerHTML = 'Tôi: ' + chat.msg;  
                }
            }
        });
        var bodyRight = document.getElementById('body-right');
        bodyRight.innerHTML = messageDisplay;

        bodyRight.scrollTo(0, bodyRight.scrollHeight);
    });
}

function StartChat(friendKey, friendName, friendPhoto) {
    var friendList = {
        friendId: friendKey,
        userId: currentUserKey,
    };

    friend_id = friendKey;

    //shortMessage = document.querySelector(`#${friendKey} #shortMess`);

    var db = firebase.database().ref('friend_list');
    var check = false;

    changeColorList(friendKey);

    db.on('value', function (friends) {
        friends.forEach(function (data) {
            var user = data.val();
            if ((user.friendId === friendList.friendId && user.userId === friendList.userId) || (user.friendId === friendList.userId && user.userId === friendList.friendId)) {
                check = true;
                chatKey = data.key;
            }
        });
        if (check === false) {
            chatKey = firebase.database().ref('friend_list').push(friendList, function (error) {
                if (error) { alert(error); }
                else {
                    document.getElementById('right').removeAttribute('style');
                    document.getElementById('start-screen').style.display = 'none';
                }
            }).getKey();
        } else {
            document.getElementById('right').removeAttribute('style');
            document.getElementById('start-screen').style.display = 'none';
        }
        //show name and image
        document.getElementById('divChatName').innerHTML = friendName;
        document.getElementById('divImgChat').src = friendPhoto;

        document.getElementById('body-right').innerHTML = ''

        //show the chat messages
        LoadChatMessage(chatKey, friendPhoto, friendKey);       
        if (screen.width <= 700) {
            showChatPannel();
        }
    });
}

var right = document.getElementById('right').style;
var left = document.getElementById('left').style;

function showChatPannel() {
    right.display = 'flex';
    left.display = 'none';
}

function backListFriend() {
    right.display = 'none';
    left.display = 'flex';
}

onFirebaseStateChanged();

