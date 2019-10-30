'use strict';
const titleClickHandler = function(){
  const clickedElement = this;
  event.preventDefault();
  console.log('Link was clicked!');
  console.log(event);
  /* [DONE] remove class 'active' from all article links  */
  const activeLinks = document.querySelectorAll('.titles a.active');
  for(let activeLink of activeLinks){
    activeLink.classList.remove('active');
  }
  /* [DONE] add class 'active' to the clicked link */
  clickedElement.classList.add('active');
  /* [DONE] remove class 'active' from all articles */
  const activeArticles = document.querySelectorAll('.posts article.active');
  for(let activeArticle of activeArticles){
    activeArticle.classList.remove('active');
  }
  /* [DONE] get 'href' attribute from the clicked link */
  const hrefAttribute = clickedElement.getAttribute('href');
  /* [DONE] find the correct article using the selector (value of 'href' attribute) */
  const selectedArticle = document.querySelector(hrefAttribute);
  /* [DONE] add class 'active' to the correct article */
  selectedArticle.classList.add('active');
}
const optArticleSelector = '.post',
  optTitleSelector = '.post-title',
  optTitleListSelector = '.titles',
  optArticleTagsSelector = '.post-tags .list',
  optArticleAuthorSelector = '.post-author',
  optTagsListSelector = '.tags.list',
  optAuthorsListSelector = '.list.authors',
  optCloudClassCount = 5,
  optCloudClassPrefix = 'tag-size-' ;

function generateTitleLinks(customSelector = ''){
  console.log(customSelector)
  /* remove contents of titleList */
  const titleList = document.querySelector(optTitleListSelector);
  titleList.innerHTML = '';
  /* for each article */
  const articles = document.querySelectorAll(optArticleSelector + customSelector);
  console.log(optArticleSelector + customSelector);
  for(let article of articles){
    /* get the article id */
    const articleId = article.getAttribute('id');
    /* find the title element */
    /* get the title from the title element */
    const articleTitle = article.querySelector(optTitleSelector).innerHTML;
    /* create HTML of the link */
    const linkHTML = '<li><a href="#' + articleId + '"><span>' + articleTitle + '</span></a></li>';
    /* insert link into titleList */    
    document.querySelector('.titles').innerHTML += linkHTML
  }
  const links = document.querySelectorAll('.titles a');
  console.log(links)
  for(let link of links){
    link.addEventListener('click', titleClickHandler);
  }
}
generateTitleLinks();

function calculateTagsParams(allTags){
  const params = {max: 0, min: 999999};
  for(let tag in allTags){
    if(allTags[tag] > params.max){
      params.max = [tag];
    }
    if(allTags[tag] > params.min){
      params.min = [tag];
    }
    //console.log(tag + ' is used ' + allTags[tag] + ' times ');
  }
  return params;
}

function calculateTagClass(count, params){
  // console.log(count, params)
  
const normalizedCount = count - params.min;
const normalizedMax = params.max.lenght - params.min;
const percentage = normalizedCount / normalizedMax;
const classNumber = Math.floor( percentage * (optCloudClassCount - 1) + 1 );
// console.log(percentage, optCloudClassCount)
const tagClassResult = optCloudClassPrefix + classNumber;
// console.log(tagClassResult)
return tagClassResult;
}

function generateTags(){
   /* [NEW] create a new variable allTags with an empty object */
   let allTags = {};
  /* find all articles */
  const articles = document.querySelectorAll(optArticleSelector);
  /* START LOOP: for every article: */
  for(let article of articles){
    /* find tags wrapper */
    const articleTagsWrapper = article.querySelector(optArticleTagsSelector);
    /* make html variable with empty string */
    let html = '';
    /* get tags from data-tags attribute */
    const articleTags = article.getAttribute('data-tags');
    /* split tags into array */
    const articleTagsArray = articleTags.split(' ');
    /* START LOOP: for each tag */
    for(let tag of articleTagsArray){
      /* generate HTML of the link */
      const linkHTML = '<li><a href="#' + articleTags + '"><span>' + tag + '</span></a></li>';
      /* add generated code to html variable */
      html = html + linkHTML;
      /* [NEW] check if this link is NOT already in allTags */
      if(!allTags.hasOwnProperty(tag)){
      /* [NEW] add tag to allTags object */
      allTags[tag] = 1;
      }else {
        allTags[tag]++;
      }
    /* END LOOP: for each tag */
    }
    /* insert HTML of all the links into the tags wrapper */
    articleTagsWrapper.innerHTML = html;
  /* END LOOP: for every article: */
  }
  /* [NEW] find list of tags in right column */
  const tagList = document.querySelector('.tags');

  const tagsParams = calculateTagsParams(allTags)
  console.log('tagsParams:', tagsParams)
  /* [NEW] create variable for all links HTML code */
  let allTagsHTML = '';
  /* [NEW] START LOOP: for each tag in allTags: */
  for(let tag in allTags){
    /* [NEW] generate code of a link and add it to allTagsHTML */
  // allTagsHTML += '<a href="#">' + tag +  ' (' + allTags [tag] + ') ' +  '</a>';
  
  const tagLinkHTML = '<li><a class ="' + calculateTagClass(allTags[tag], tagsParams) + '" href="#tag-' + tag + '">' + tag + '</a></li>' + ' ';
  console.log('tagLinkHTML:', tagLinkHTML);
  allTagsHTML += tagLinkHTML; 
  }
  /* [NEW] END LOOP: for each tag in allTags: */
  /* [NEW] add html from allTagsHTML to tagList */
  
  tagList.innerHTML = allTagsHTML;
}

generateTags();

function tagClickHandler(event){
  /* prevent default action for this event */
  event.preventDefault();
  /* make new constant named "clickedElement" and give it the value of "this" */
  const clickedElement = this;
  /* make a new constant "href" and read the attribute "href" of the clicked element */
  const href = clickedElement.getAttribute('href');
  /* make a new constant "tag" and extract tag from the "href" constant */
  const tag = href.replace('#tag-', '');
  /* find all tag links with class active */
  const activeTagLinks = document.querySelectorAll('a.active[href^="#tag-"]');
  /* START LOOP: for each active tag link */
  for(let activeTagLink of activeTagLinks){
    /* remove class active */
    activeTagLink.classList.remove('active');
  /* END LOOP: for each active tag link */
  }
  /* find all tag links with "href" attribute equal to the "href" constant */
  const tagLinks = document.querySelectorAll('a[href="' + href + '"]');
  /* START LOOP: for each found tag link */
  for(let tagLink of tagLinks){
    /* add class active */
    tagLink.classList.add('active');
  /* END LOOP: for each found tag link */
  }
  /* execute function "generateTitleLinks" with article selector as argument */
generateTitleLinks('[data-tags~="' + tag + '"]');
}


function addClickListenersToTags(){
  /* find all links to tags */
  const allLinksToTags = document.querySelectorAll('a[href^="#tag-"]');
  /* START LOOP: for each link */
  for (let allLinksToTag of allLinksToTags){
    /* add tagClickHandler as event listener for that link */
    allLinksToTag.addEventListener("click", tagClickHandler);
  /* END LOOP: for each link */
  }
}


addClickListenersToTags();

function calculateAuthorsParams(authors) {
  const params = {max: 0, min: 999999}
  for (let author in authors) {
    if (authors[author] > params.max) {
      params.max = authors[author];
    }
    if (authors[author] < params.min) {
      params.min = authors[author];
    }
  }
  return params;
}

function calculateAuthorClass(count, params){
  const normalizedCount = count - params.min;
  const normalizedMax = params.max - params.min;
  const percentage = normalizedCount / normalizedMax;
  const classNumber = Math.floor( percentage * (optCloudClassCount - 1) + 1);
  const authorClassResult = optCloudClassPrefix + classNumber;
  return authorClassResult;
  
}

function generateAuthors(){
  debugger;
  /* [NEW] create a new variable allAuthors with an empty object */
  let allAuthors = {};
  /* find all articles */
  const articles = document.querySelectorAll(optArticleSelector);
  /* START LOOP: for every article: */
  for(let article of articles){
    /* find authors wrapper */
    const articleAuthorsWrapper = article.querySelector(optArticleAuthorSelector);
    /* make html variable with empty string */
    let html = '';
    /* get authors from data-authors attribute */
    const articleAuthors = document.querySelector('.post').dataset.author;
    /* Generate HTML of the link */
    const linkHTML = '<a href="#author-' + articleAuthors + '">' + articleAuthors + '</a>' + ' ';
    /* add generated code to html variable */
    html = html + linkHTML;
    // console.log(html);
    if (!allAuthors.hasOwnProperty(articleAuthors)){
      /* [NEW] add generated code to allAuthors array */
      allAuthors[articleAuthors] = 1;
    }else {
      allAuthors[articleAuthors]++;
    }
    /* insert HTML of all the links into the author wrapper */
    articleAuthorsWrapper.innerHTML = html;
  /* END LOOP: for every article: */
  }
  /* [NEW] find list of authors in right column */
  const authorCloudList =document.querySelector('.authors');
  const authorParams = calculateAuthorsParams(allAuthors);
  //console.log('authorParams:', authorParams);
  /* [NEW] add html from allTags to taglist */
  let allAuthorsHTML = ' '
  //console.log('allAuthorsHTML:', allAuthorsHTML);
  /* [NEW] START LOOP: for each author in allAuthors: */
  for(let articleAuthor in allAuthors) {
    /* [NEW] generate code of a link and add it to allTagsHTML */
    const authorLinkHTML = '<li><a class ="tag-size-' + calculateAuthorClass(allAuthors[articleAuthor], authorParams) +'" href="#author-' + articleAuthor + '">' + articleAuthor + '</a></li>' + ' ';
    allAuthorsHTML += authorLinkHTML;
  /* [NEW] END LOOP: for each author in allAuthors */
  }
  /* [NEW] add html from allAuthors to authorList */
  authorCloudList.innerHTML += allAuthorsHTML;
}

generateAuthors();

function authorClickHandler(event){
  /* prevent default action for this event */
  event.preventDefault();
  /* make new constant named "clickedElement" and give it the value of "this" */
  const clickedElement = this;
  /* make a new constant "href" and read the attribute "href" of the clicked element */
  const href = clickedElement.getAttribute('href');
  /* make a new constant "tag" and extract tag from the "href" constant */
  const author = href.replace('#author-', '');
  /* find all tag links with class active */
  const activeAuthorLinks = document.querySelectorAll('a.active[href^="#author-"]');
  /* START LOOP: for each active tag link */
  for(let activeAuthorLink of activeAuthorLinks){
    /* remove class active */
    activeAuthorLink.classList.remove('active');
  /* END LOOP: for each active tag link */
  }
  /* find all author links with "href" attribute equal to the "href" constant */
  const authorLinks = document.querySelectorAll('a[href="' + href + '"]');
  /* START LOOP: for each found tag link */
  for(let authorLink of authorLinks){
    /* add class active */
    authorLink.classList.add('active');
  /* END LOOP: for each found tag link */
  }
  /* execute function "generateTitleLinks" with article selector as argument */
generateTitleLinks('[data- ="' + author + '"]');
}

function addClickListenersToAuthors(){
  /* find all links to authors */
  const allLinksToAuthors = document.querySelectorAll('a[href^="#author-"]');
  /* START LOOP: for each link */
  for (let allLinksToAuthor of allLinksToAuthors){
    /* add tagClickHandler as event listener for that link */
    allLinksToAuthor.addEventListener("click", tagClickHandler);
  /* END LOOP: for each link */
  }
}