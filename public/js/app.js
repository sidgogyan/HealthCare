async function getdata(){
      const country=document.getElementById("search");
    const data=await fetch("https://api.covid19api.com/summary");
   
    const mydata= await data.json();

    const arr=mydata.Countries;
    let temp=false;
    for(let i=0;i<arr.length;i++){
        if(arr[i].Country.toUpperCase()==country.value.toUpperCase()){
            temp=true;
          document.getElementById("Country").innerHTML=arr[i].Country;
          document.getElementById("TotalConfirmed").innerHTML=arr[i].TotalConfirmed;
          document.getElementById("TotalRecovered").innerHTML=arr[i].TotalRecovered;
          document.getElementById("TotalDeaths").innerHTML=arr[i].TotalDeaths;
          document.getElementById("NewConfirmed").innerHTML=arr[i].NewConfirmed;
          document.getElementById("date").innerHTML=new Date().toLocaleString();
          document.getElementById("err").innerHTML="";
          
          
          break;
        }
    }

    if(temp==false){
     
    document.getElementById("err").innerHTML="please provide correct country name";
    }


}