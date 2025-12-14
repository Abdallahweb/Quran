const apiUrl='https://mp3quran.net/api/v3';const endPoint='reciters';const language='ar';const chooseReciters=document.getElementById("chooseReciters");const chooseMoshaf=document.getElementById("chooseMoshaf");const chooseSurah=document.getElementById("chooseSurah");async function getReciters(){const res=await fetch(`${apiUrl}/${endPoint}?language=${language}`);const data=await res.json();data.reciters.forEach(reciter=>{chooseReciters.innerHTML+=`
           
            <div class="col-lg-4">

            <a data-bs-toggle="offcanvas" class="links" href="#offcanvasExample">

   <div class="reciters" onclick="getMoshaf(this)"  data-reciter-id="${reciter.id}">

${reciter.name}  
<i class="fa fa-microphone"></i>

</div>  </a>  </div>`})}
getReciters();async function getMoshaf(reciter){const res=await fetch(`${apiUrl}/${endPoint}?language=${language}&reciter=${reciter.getAttribute("data-reciter-id")}`);const data=await res.json();const moshafs=data.reciters[0].moshaf;chooseSurah.innerHTML="";chooseMoshaf.innerHTML=`<option value="">اختر القراءة</option>`;moshafs.forEach(moshaf=>{chooseMoshaf.innerHTML+=`<option class="option_mushaf" 
       value="${moshaf.id}"
       data-server = "${moshaf.server}"
        data-surahlist = "${moshaf.surah_list}"
       >${moshaf.name}</option>`});chooseMoshaf.addEventListener('change',e=>{chooseSurah.innerHTML="";const selectedMoshaf=chooseMoshaf.options[chooseMoshaf.selectedIndex];const surahServer=selectedMoshaf.dataset.server;const surahList=selectedMoshaf.dataset.surahlist;getSurah(surahServer,surahList)})}
async function getSurah(surahServer,surahList){const res=await fetch(`https://mp3quran.net/api/v3/suwar`);const data=await res.json();const surahNames=data.suwar;surahList=surahList.split(',');surahList.forEach(surah=>{const padSurah=surah.padStart(3,'0');surahNames.forEach(surahName=>{if(surahName.id==surah&&surahName.makkia==0){chooseSurah.innerHTML+=`
        <div class="col-lg-6" >


   <div class="surah" onclick="playSurah(this)"  data-surah-id="${surahServer}${padSurah}.mp3">

   <p>${surahName.name} | مدنيه </p>
</div> 


</div>
       
       `}else if(surahName.id==surah&&surahName.makkia==1){chooseSurah.innerHTML+=`
        <div class="col-lg-6" >


   <div class="surah" onclick="playSurah(this)"  data-surah-id="${surahServer}${padSurah}.mp3">

   <p>${surahName.name} | مكيه </p>

</div> 


</div>
       
       `}})})}
function playSurah(surahMp3){var containerSurah=document.querySelector(".containerSurah");const modelBtn=document.getElementById("modelBtn");var audioPlay=document.getElementById("audioPlay");audioPlay.src=surahMp3.getAttribute("data-surah-id");containerSurah.style.display="block";modelBtn.click();audioPlay.play()}
function closeContainer(){var containerSurah=document.querySelector(".containerSurah");var audioPlay=document.getElementById("audioPlay");containerSurah.style.display="none";audioPlay.pause()}
