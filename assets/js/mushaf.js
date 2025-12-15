const apiUrl='https://mp3quran.net/api/v3';const endPoint='reciters';const language='ar';const AllData=document.getElementById("AllData");const chooseMoshaf=document.getElementById("chooseMoshaf");const chooseSurah=document.getElementById("chooseSurah");const chooseTafsir=document.getElementById("chooseTafsir");const audioPlay=document.getElementById("audioPlay");const videoPlay=document.getElementById("videoPlay");const surahImg=document.getElementById("surahImg");const modelBtn=document.getElementById("modelBtn");const containerSurah=document.querySelector(".containerSurah");function scrollFunc(){window.scroll({top:500,left:0,behavior:'smooth',})}
function closeContainer(){containerSurah.style.display="none";audioPlay.pause();videoPlay.pause()}
function playAudio(url){videoPlay.style.display="none";audioPlay.style.display="inline-block";surahImg.style.display="inline-block";audioPlay.src=url;containerSurah.style.display="block";if(modelBtn){modelBtn.click()}
audioPlay.play()}
function playVideo(url){audioPlay.style.display="none";surahImg.style.display="none";videoPlay.style.display="block";videoPlay.src=url;containerSurah.style.display="block";if(modelBtn){modelBtn.click()}
videoPlay.play()}
async function getReciters(){AllData.innerHTML="";try{const res=await fetch(`${apiUrl}/${endPoint}?language=${language}`);const data=await res.json();data.reciters.forEach(reciter=>{AllData.innerHTML+=`
                <div class="col-lg-4 mt-2 mb-2">
                    <a data-bs-toggle="offcanvas" class="links" href="#offcanvasExample">
                        <div class="reciters" onclick="getMoshaf(this)" data-reciter-id="${reciter.id}">
                            ${reciter.name} 
                            <i class="fa fa-microphone"></i>
                        </div> 
                    </a> 
                </div>`});scrollFunc()}catch(error){console.error("Error fetching reciters:",error);AllData.innerHTML=`<p class="alert alert-danger">حدث خطأ أثناء جلب قائمة القراء.</p>`}}
async function getMoshaf(reciterElement){const reciterId=reciterElement.getAttribute("data-reciter-id");chooseSurah.innerHTML="";try{const res=await fetch(`${apiUrl}/${endPoint}?language=${language}&reciter=${reciterId}`);const data=await res.json();const moshafs=data.reciters[0].moshaf;chooseMoshaf.innerHTML=`<option value="">اختر القراءة</option>`;moshafs.forEach(moshaf=>{chooseMoshaf.innerHTML+=`
                <option class="option_mushaf" 
                    value="${moshaf.id}"
                    data-server="${moshaf.server}"
                    data-surahlist="${moshaf.surah_list}"
                >
                    ${moshaf.name}
                </option>`});chooseMoshaf.onchange=()=>{chooseSurah.innerHTML="";const selectedMoshaf=chooseMoshaf.options[chooseMoshaf.selectedIndex];const surahServer=selectedMoshaf.dataset.server;const surahList=selectedMoshaf.dataset.surahlist;if(surahServer&&surahList){getSurah(surahServer,surahList)}}}catch(error){console.error("Error fetching moshafs:",error)}}
async function getSurah(surahServer,surahList){try{const res=await fetch(`${apiUrl}/suwar`);const data=await res.json();const surahNames=data.suwar;let Place="";const availableSurahs=surahList.split(',');chooseSurah.innerHTML="";availableSurahs.forEach(surahId=>{const surahNameObj=surahNames.find(s=>s.id==surahId);if(surahNameObj){const padSurah=surahId.padStart(3,'0');Place=(surahNameObj.makkia==0)?"مدنيه":"مكيه";chooseSurah.innerHTML+=`
                    <div class="col-lg-6 mt-4">
                        <div class="surah" onclick="playSurah(this)" data-surah-id="${surahServer}${padSurah}.mp3">
                            <p>${surahNameObj.name} | ${Place}</p>
                        </div> 
                    </div>`}});scrollFunc()}catch(error){console.error("Error fetching surah list:",error)}}
async function getTafsir(){AllData.innerHTML="";try{const response=await fetch(`${apiUrl}/tafsir`);const data=await response.json();const soar=data.tafasir.soar;soar.forEach(soars=>{AllData.innerHTML+=`
                <div class="col-lg-4 mt-2 mb-2">
                    <div class="reciters" onclick="playTafsir(this)" data-tafsir-id="${soars.url}">
                        ${soars.name} 
                        <i class="fa fa-headphones"></i>
                    </div> 
                </div>`});scrollFunc()}catch(error){console.error("Error fetching tafsir:",error);AllData.innerHTML=`<p class="alert alert-danger">حدث خطأ أثناء جلب قائمة مواد التفسير.</p>`}}
async function getRadio(){AllData.innerHTML="";try{const response=await fetch(`${apiUrl}/radios?language=${language}`);const data=await response.json();const radios=data.radios;radios.forEach(radio=>{AllData.innerHTML+=`
                <div class="col-lg-4 mt-2 mb-2">
                    <div class="reciters" onclick="playRadio(this)" data-radio-id="${radio.url}">
                        ${radio.name} 
                        <i class="material-icons" style="font-size:24px">radio</i>
                    </div> 
                </div>`});scrollFunc()}catch(error){console.error("Error fetching radios:",error);AllData.innerHTML=`<p class="alert alert-danger">حدث خطأ أثناء جلب قائمة محطات الراديو.</p>`}}
async function getLive(){AllData.innerHTML="";try{const response=await fetch(`${apiUrl}/live-tv`);const data=await response.json();const livetv=data.livetv;livetv.forEach(tv=>{AllData.innerHTML+=`
                <div class="col-lg-6 mt-2 mb-2">
                    <div class="reciters" onclick="playTv(this)" data-tv-id="${tv.url}">
                        ${tv.name} 
                        <i class="fa fa-tv"></i>
                    </div> 
                </div>`});scrollFunc()}catch(error){console.error("Error fetching live tv:",error);AllData.innerHTML=`<p class="alert alert-danger">حدث خطأ أثناء جلب قائمة البث المباشر.</p>`}}
function playSurah(surahMp3Element){const surahUrl=surahMp3Element.getAttribute("data-surah-id");playAudio(surahUrl)}
function playTafsir(tafsirMp3Element){const tafsirUrl=tafsirMp3Element.getAttribute("data-tafsir-id");playAudio(tafsirUrl)}
function playRadio(radioElement){const radioUrl=radioElement.getAttribute("data-radio-id");playAudio(radioUrl)}
function playTv(tvElement){const tvUrl=tvElement.getAttribute("data-tv-id");playVideo(tvUrl)}
