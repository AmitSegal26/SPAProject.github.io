let picsArr; //מערך האייטמים למכירה
let galleryDiv; //הדיב של הרשימה עצמה (העוטף)
let isBusiness;
let deletePic; // a variable that will get a function as a value
let showPopup; //a variable that will get a function as a value
//this function will transfer data from homepage to this page
const initialPicsGallery = (
  picsArrFromHomePage,
  isBusinessParameter,
  deletePicFromHomePage,
  showPopupFromHomePage
) => {
  galleryDiv = document.getElementById("home-gallery-content");
  isBusiness = isBusinessParameter;
  deletePic = deletePicFromHomePage;
  showPopup = showPopupFromHomePage;
  updatePicsGallery(picsArrFromHomePage);
};

const updatePicsGallery = (picsArrFromHomePage) => {
  /*
    this function will get data from homepage and create new gallery.
    if the gallery already exists it will remove the old one and
    create new one
  */
  picsArr = picsArrFromHomePage;
  createGallery();
};

const createGallery = () => {
  let innerStr = "";
  //clear event galleryeners for delete btns
  clearEventListeners("home-pic-gallery-delete-btn", handleDeleteBtnClick);
  //clear event galleryeners for edit btns
  clearEventListeners("home-pic-gallery-edit-btn", handleEditBtnClick);
  //create new elements and remove old ones
  for (let pic of picsArr) {
    innerStr += createItem(
      pic.id,
      pic.name,
      pic.imgUrl,
      pic.credit,
      pic.description,
      pic.price
    );
  }
  galleryDiv.innerHTML = innerStr;
  // add event galleryeners for delete btns
  createBtnEventListener("home-pic-gallery-delete-btn", handleDeleteBtnClick);
  // add event galleryeners for edit btns
  createBtnEventListener("home-pic-gallery-edit-btn", handleEditBtnClick);
};

const createItem = (id, name, img, credit, description, price) => {
  const businessBtns = `
  <button type="button" class="btn btn-warning w-100" id="home-pic-gallery-edit-btn_${id}">
    <i class="bi bi-pen-fill"></i> Edit
  </button>
  <button type="button" class="btn btn-danger w-100" id="home-pic-gallery-delete-btn_${id}">
    <i class="bi bi-x-circle-fill"></i> Delete
  </button>
  `;
  return `
  <div class="col">
    <div class="card h-100">
      <img
        src="${img}"
        class="card-img-top"
        alt="${name}"
      />
      <div class="card-body">
        <h4 class="card-name">${name}</h4>
        <h5 class="card-name">By${credit}</h5>
        <p class="card-text">
          ${description}
        </p>
      </div>
      <ul class="list-group list-group-flush">
        <li class="list-group-item">${price}</li>
      </ul>
      <div class="card-body d-flex">
        <button type="button" class="btn btn-success w-100"><i class="bi bi-cash-coin"></i>
          Purchase
        </button>
        ${isBusiness ? businessBtns : ""}
      </div>
    </div>
  </div>
  `;
};

const getIdFromClick = (ev) => {
  let idFromId = ev.target.id.split("_"); // split the id to array
  if (!ev.target.id) {
    /*
      if press on icon then there is no id
      then we need to take the id of the parent which is btn
    */
    idFromId = ev.target.parentElement.id.split("_");
  }
  return idFromId[1];
};

const handleDeleteBtnClick = (ev) => {
  deletePic(getIdFromClick(ev));
};

const handleEditBtnClick = (ev) => {
  showPopup(getIdFromClick(ev));
};

const clearEventListeners = (idKeyword, handleFunction) => {
  //get all old btns
  let btnsBefore = document.querySelectorAll(`[id^='${idKeyword}_']`);
  //remove old events
  for (let btn of btnsBefore) {
    btn.removeEventListener("click", handleFunction);
  }
};

const createBtnEventListener = (idKeyword, handleFunction) => {
  let btns = document.querySelectorAll(`[id^='${idKeyword}_']`);
  //add events to new btns
  for (let btn of btns) {
    btn.addEventListener("click", handleFunction);
  }
};

export { initialPicsGallery, updatePicsGallery };