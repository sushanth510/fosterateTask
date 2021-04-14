document.getElementById("add").addEventListener("click",function(){change_navitem("add")})


document.getElementById("home").addEventListener("click",function(){change_navitem("home")});


window.addEventListener("load",function(){change_navitem("home")});

var boolean_edit=false
function change_navitem(id)

{
    
    var current_active=document.getElementsByClassName("active")
    //console.log(current_active)
    current_active[0].className=current_active[0].className.replace("active","")
    if(id!="edit_action")
    document.getElementById(id).className+=" active"
    if(id=="add")
    {
        let current_active2=document.getElementsByClassName("contact-active");
        
        
        if(current_active2.length!=0)
        {
        current_active2[0].className=current_active2[0].className.replace(" contact-active","");
        }

        document.getElementById("display-contact").style.display="none";
        document.getElementById("details-modification").style.display="none";
        document.getElementById("form1").style.display="inline-block";
        //document.getElementById("btne").style.display="none";
        document.getElementById("btn").style.display="inline-block";
        document.getElementById("form").reset();
    }
    
    if(id=="home")
    {
        console.log("called change_active home")
        document.getElementById("display-contact").style.display="inline-block";
        document.getElementById("details-modification").style.display="inline-block";
        document.getElementById("form1").style.display="none";

        let current2=document.getElementsByClassName("contact-active");
        if(current2.length==0)
        {
            let current1=document.getElementsByClassName("contact-details");
            if(current1.length!=0)
            {
                let id_n=current1[0].id;
                current1[0].className+=" contact-active";
                for(let i=0;i<carray.length;i++)
                {
                    if(id_n==carray[i]["c_id"])
                    {
                        display_details(id_n,carray[i]);
                        break;
                    }
                }

            }
        }
    }
    if(id=="edit_action")
    {
        boolean_edit=true
        document.getElementById("home").className+=" active"

        document.getElementById("display-contact").style.display="none";
        document.getElementById("details-modification").style.display="none";
        document.getElementById("form1").style.display="inline-block";
        //document.getElementById("btne").style.display="inline-block";
        document.getElementById("btn").style.display="inline-block";
        //var inpute=document.getElementsByTagName("input")
        
        var current5=document.getElementsByClassName("contact-active");
        console.log(current5[0].id)
        let obj1={0:"name",1:"email",2:"mobile",3:"landline",4:"website",5:"address"}
        for(var i=0;i<carray.length;i++)
        {
            if(carray[i]["c_id"]==current5[0].id)
            {
                console.log(carray[i]);
                for(key in obj1)
                {
                    document.getElementById(obj1[key]).value=carray[i][obj1[key]];
                    
                    
                }
                break;
            }
        }
    }
}
var carray=[]

class contact
{
    constructor(c_id,name,email,mobile,landline,website,address)
    {
        this.c_id='contact'+c_id;//contact4
        this.name=name;
        this.email=email;
        this.mobile=mobile;
        this.landline=landline;
        this.website=website;
        this.address=address;
    }
};
var obj1=new contact(1,"Harsha Vardhan Pendyala","harsha@fosterate.com","7777888855","","","hyderabad");
var obj2=new contact(2,"Network Duke","duke@fosterate.com","7777888855","","","hyderabad");
var obj3=new contact(3,"Arshaque Mohammed","arshaque@fosterate.com","7777888855","","","hyderabad");
var id_count=3;
carray.push(obj1);
carray.push(obj2);
carray.push(obj3);
document.getElementById(obj1["c_id"]).addEventListener("click",function(){display_details(obj1["c_id"],obj1)});
document.getElementById(obj2["c_id"]).addEventListener("click",function(){display_details(obj2["c_id"],obj2)});
document.getElementById(obj3["c_id"]).addEventListener("click",function(){display_details(obj3["c_id"],obj3)});



function display_details(id,obj)
{
    //document.getElementById("display-contact").style.visibility="";
    
    console.log("called display details")
    document.getElementById("display-name").innerHTML=obj.name;
    document.getElementById("display-email").innerHTML=obj.email;
    document.getElementById("display-mobile").innerHTML=obj.mobile;
    document.getElementById("display-landline").innerHTML=obj.landline;
    document.getElementById("display-website").innerHTML=obj.website;
    
    var x=obj.address.split(",")
    console.log(obj)
    
    
    if(x[0]!="")
    {
        document.getElementById("display-address").innerHTML=x[0];
    }
    else
    {
        document.getElementById("display-address").innerHTML="Hyderabad";
    }

    if(x[1]!=undefined)
    {
        document.getElementById("display-state").innerHTML=x[1];
    }
    else
    {
        document.getElementById("display-state").innerHTML="Telangana";
    }

    if(x[2]!=undefined)
    {
        document.getElementById("display-pin-code").innerHTML=x[2];
    }
    else
    {
        document.getElementById("display-pin-code").innerHTML="500061";
    }
    
    
    
    
    
    let current2=document.getElementsByClassName("contact-active");
    
    if(current2.length!=0)
    {
    current2[0].className=current2[0].className.replace(" contact-active","");
    document.getElementById(id).className+=" contact-active";
    }
}



var inpute2=document.getElementsByTagName("input")
var frm=document.getElementById("form")
//btn.addEventListener("submit",function(){addnewcontact()})
frm.addEventListener("submit",function(){
                                            if(boolean_edit)
                                            {
                                                edit_details();
                                                change_navitem("home");

                                            }
                                            else
                                            {
                                                addnewcontact();
                                                change_navitem("home")
                                            }
                                        })
                                            
function addnewcontact()
{
    
    id_count+=1;
    console.log("called addnewcontact()")
   // document.getElementById("display-contact").style.visibility="visible";
    
    let obj=new contact(id_count,document.getElementById("name").value,document.getElementById("email").value,document.getElementById("mobile").value,document.getElementById("landline").value,document.getElementById("website").value,document.getElementById("address").value);
    //console.log(obj)
    carray.push(obj)

    

    //creating the list element
    var contact_li=document.createElement("li");
    contact_li.id=obj["c_id"];
    //a.className="each-contact active-contact";
    contact_li.className="contact-details contact-active";
    

    //creating unordered list element
    var contact_ul=document.createElement("ul");
    
   
    //creating li element and appending text to it
    var name_li=document.createElement("li");
    name_li.id="contact-name";
    name_li.className="contact-name"
    var name_li_text=document.createTextNode(obj["name"]);
    name_li.append(name_li_text);


    var mobile_li=document.createElement("li");
    mobile_li.id="phone-number";
    var mobile_li_text=document.createTextNode(obj["mobile"]);
    mobile_li.append(mobile_li_text);


    var mail_li=document.createElement("li");
    mail_li.id="mail-id";
    var mail_li_text=document.createTextNode(obj["email"]);
    mail_li.append(mail_li_text);
    
    //appending li(c,d,e) to ul(b)
    contact_ul.append(name_li);contact_ul.append(mobile_li);contact_ul.append(mail_li);

    //appending ul(b) to li(a)
    contact_li.append(contact_ul);
    
    

    //appending li to contacts
    document.getElementById("contacts").append(contact_li);


    document.getElementById("form").reset();
    display_details(obj["c_id"],obj)
    document.getElementById(obj["c_id"]).addEventListener("click",function(){display_details(obj["c_id"],obj)})
    
}

document.getElementById("delete_action").addEventListener("click",function(){delete_action()})
function delete_action()
{
    var current3=document.getElementsByClassName("contact-active");
    console.log(current3)
    
    for(var i=0;i<carray.length;i++)
    {
        if(carray[i]["c_id"]==current3[0].id)
        {
            carray.splice(i,1);
        }
    }
    current3[0].remove();
    var k3=document.getElementsByClassName("contact-details");
    if(k3.length==0)
    {
        document.getElementById("display-contact").style.visibility="hidden";
    }
    else
    {
        document.getElementById("display-contact").style.visibility="visible";
    }
    k3[0].className+=" contact-active";
    for(var i=0;i<carray.length;i++)
    {
        if(carray[i]['c_id']==k3[0].id)
        {
            console.log("-----------------------------------------",carray[i])
            display_details(carray[i]["c_id"],carray[i]);
            break;
        }
    }
    console.log("carray is",carray)
}

document.getElementById("edit_action").addEventListener("click",function(){change_navitem("edit_action")});

function edit_details()
{
    console.log("edit called")

    var current6=document.getElementsByClassName("contact-active")
    
    
    
    let obj1={0:"name",1:"email",2:"mobile",3:"landline",4:"website",5:"address"}
    for(var i=0;i<carray.length;i++)
    {
        if(carray[i]["c_id"]==current6[0].id)
        {
            
            for(key in obj1)
            {
                carray[i][obj1[key]]=document.getElementById(obj1[key]).value
            }
            break;
        }
    }
    let obj=carray[i]
    display_details(current6[0].id,carray[i])
    //creating the list element
    var contact_li=document.createElement("li");
    contact_li.id=obj["c_id"];
    //a.className="each-contact active-contact";
    contact_li.className="contact-details contact-active";
    

    //creating unordered list element
    var contact_ul=document.createElement("ul");
    
   
    //creating li element and appending text to it
    var name_li=document.createElement("li");
    name_li.id="contact-name";
    name_li.className="contact-name"
    var name_li_text=document.createTextNode(obj["name"]);
    name_li.append(name_li_text);


    var mobile_li=document.createElement("li");
    mobile_li.id="phone-number";
    var mobile_li_text=document.createTextNode(obj["mobile"]);
    mobile_li.append(mobile_li_text);


    var mail_li=document.createElement("li");
    mail_li.id="mail-id";
    var mail_li_text=document.createTextNode(obj["email"]);
    mail_li.append(mail_li_text);
    
    //appending li(c,d,e) to ul(b)
    contact_ul.append(name_li);contact_ul.append(mobile_li);contact_ul.append(mail_li);

    //appending ul(b) to li(a)
    contact_li.append(contact_ul);
    

    //replacing li with active contact
    var contacts=document.getElementById("contacts")
    contacts.replaceChild(contact_li,current6[0])


    document.getElementById("form").reset();
    document.getElementById(obj["c_id"]).addEventListener("click",function(){display_details(obj["c_id"],obj)})
    
    boolean_edit=false;
    

}
    
    

