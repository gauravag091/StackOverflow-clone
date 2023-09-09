
export const translateapi = async(text,source_lang,target_lang) =>{
    const url = `https://script.google.com/macros/s/AKfycbyWGnhp2QmBxCF4T3jZgS0eySttYA6j_4lAUSc7f0ICFWsl8NrvLNf4CCy5KZVKoB6ZLw/exec?text=${text}&target_lang=${target_lang}&source_lang=${source_lang}`
  
    let result = undefined
 await fetch(url).then(function(response) {
   return response.json();
  }).then(function(data) {
    result = data;
  }).catch(function(err) {
    console.log('Fetch Error :-S', err);
  });
  return result;

}