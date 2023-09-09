export const translateapi = async(text,source_lang,target_lang) =>{
    const url = `https://script.google.com/macros/s/AKfycbxuoilLT6Sbhofkukku7wMOVafdNZUdOe3KpHganBhLQmc2lUe9r6jvFd7fid3QOcs/exec?text=${text}&target_lang=${target_lang}&source_lang=${source_lang}`
  
    let result = undefined
 await fetch(url, {
  method: "POST",
 
  body: JSON.stringify({
    text,
    source_lang,
    target_lang
  })
}).then(function(response) {
   return response.json();
  }).then(function(data) {
    result = data;
  }).catch(function(err) {
    console.log('Fetch Error :-S', err);
  });
  return result;
}