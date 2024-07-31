///////////////////////////////////////////////////////////////////////////////////////////////
// Create 3 arrays                                                                          //
// Use GET method to compare with the input for email and password                         //
// -If the email and password entered is same as one of the set of data in database       //
// Then we move to homepage page                                                         // 
// -Else will continue to stay as the login page                                        //
/////////////////////////////////////////////////////////////////////////////////////////

var contact = [];
var tempArr = []
var loginEmail;
var loginPassword;
var check;
$(document).ready(function () 
{
    const APIKEY = "66a0e1ef123094ba23859e6b";
    checkLogin();
    
    
    $("#login-submit").on("click", function (e) {

        e.preventDefault();

        let loginEmail = $("#login-email").val();
        let loginColour = $("#signup-colour").val();
    
        let jsondata = 
        { 
            "email": loginEmail,
            "colour": loginColour
        };
        
        
        if (checkLogin2() == true) {
            alert("Login successful");
            localStorage.setItem("loggedInEmail", loginEmail);  // Store the email in local storage
            window.location.href = "update.html";  // Redirect to password reset page
        } 
        else if (loginEmail == "" || loginColour == "") {
            alert("Please fill in all fields");
            console.log("Login Unsuccessful");
        }
        else {
            alert("Validate Failed");
            console.log("Login Unsuccessful");
        }
        
        

    }); 
    



    function checkLogin() 
    {
        let settings = 
        {
            "async": true,
            "crossDomain": true,
            "url": "https://dscploginpage-9024.restdb.io/rest/login",
            "method": "GET",
            "headers": {
                "content-type": "application/json",
                "x-apikey": APIKEY,
                "cache-control": "no-cache"
            }
        }
        $.ajax(settings).done(function (response) 
        {
            
            for (let i = 0; i < response.length; i++) 
            {
                tempArr.push(response[i].email);
                tempArr.push(response[i].colour);
                contact.push(tempArr);
                tempArr = [];
            }
            console.log(contact);
            
        });

        
    }

    function checkLogin2() 
    {
        let i = 0;
        while(i < contact.length)
        {
            if (contact[i][0] == $("#login-email").val() && contact[i][1] == $("#signup-colour").val())
            {
                console.log("Login successful");
                check = true;
                contact = [];
                return check;
            }

            else
            {
                console.log("Login Failed");
                check = false;
                i++;
            }
        }
        
        
    }
    
});
