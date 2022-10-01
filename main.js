!function(){"use strict";function e(e,t,s){return t in e?Object.defineProperty(e,t,{value:s,enumerable:!0,configurable:!0,writable:!0}):e[t]=s,e}var t=class{constructor(t,s){e(this,"_hasValidInputs",(()=>this.inputList.every((e=>!0===e.validity.valid)))),e(this,"_toggleButton",(()=>{const e=this.formElement.querySelector(this.settings.submitButtonSelector);this._hasValidInputs()?this._enableButton(e):this.disableButton(e)})),e(this,"_showInputError",(e=>{const{inputErrorClass:t}=this.settings;this.formElement.querySelector("#".concat(e.id,"-error")).textContent=e.validationMessage,e.classList.add(t)})),e(this,"_hideInputError",(e=>{const{inputErrorClass:t}=this.settings;this.formElement.querySelector("#".concat(e.id,"-error")).textContent="",e.classList.remove(t)})),e(this,"_checkInputValidity",(e=>{e.validity.valid?this._hideInputError(e):this._showInputError(e,e.validationMessage)})),e(this,"_setEventListener",(()=>{const{inputSelector:e}=this.settings;this.inputList=[...this.formElement.querySelectorAll(e)],this.inputList.forEach((e=>{e.addEventListener("input",(()=>{this._checkInputValidity(e),this._toggleButton()}))}))})),this.settings=t,this.formElement=s}resetFormErrors(){this.inputList.forEach((e=>{this._hideInputError(e)}))}_enableButton(e){e.classList.remove(this.settings.inactiveButtonClass),e.disabled=!1}disableButton(e){e.classList.add(this.settings.inactiveButtonClass),e.disabled=!0}enableValidation(){this.formElement.addEventListener("submit",(e=>e.preventDefault())),this._setEventListener(this.formElement,this.settings)}};function s(e,t,s){return t in e?Object.defineProperty(e,t,{value:s,enumerable:!0,configurable:!0,writable:!0}):e[t]=s,e}class n{constructor(e,t,n){s(this,"_handleCardDeleteButton",(()=>this._cardElement.remove())),s(this,"_handleLikeButton",(e=>{e.target.classList.toggle("card__like-button_filled")})),s(this,"_addEventListeners",(()=>{this._cardImage.addEventListener("click",(()=>this._handleImageClick())),this._cardDeleteButton.addEventListener("click",this._handleCardDeleteButton),this._cardLikeButton.addEventListener("click",this._handleLikeButton)})),s(this,"createCard",(()=>(this._cardElement=this._getTemplate().cloneNode(!0),this._cardImage=this._cardElement.querySelector(".card__image"),this._cardDeleteButton=this._cardElement.querySelector(".card__trash-button"),this._cardLikeButton=this._cardElement.querySelector(".card__like-button"),this._cardImage.style.backgroundImage="url(".concat(this._data.link,")"),this._cardElement.querySelector(".card__title").textContent=this._data.name,this._addEventListeners(),this._cardElement))),this._data=e,this._cardTemplateSelector=t,this._handleImageClick=n}_getTemplate(){return document.querySelector(this._cardTemplateSelector).content.querySelector(".card")}}class r{constructor(e){this._popup=document.querySelector(e),this._handleEscClose=this._handleEscClose.bind(this)}_handleEscClose(e){"Escape"===e.key&&this.close()}open(){this._popup.classList.add("popup_open"),document.addEventListener("keydown",this._handleEscClose)}close(){this._popup.classList.remove("popup_open"),document.removeEventListener("keydown",this._handleEscClose)}setEventListeners(){this._popup.addEventListener("mousedown",(e=>{(e.target.classList.contains("popup")||e.target.classList.contains("popup__close"))&&this.close()}))}}class o extends r{constructor(e,t){super(e),this._handleSubmit=t,this._form=this._popup.querySelector(".popup__form")}_getInputValues(){const e={};return[...this._form.querySelectorAll(".form__input")].forEach((t=>{const s=t.name,n=t.value;e[s]=n})),e}setEventListeners(){super.setEventListeners(),this._form.addEventListener("submit",(e=>{e.preventDefault(),this._handleSubmit(this._getInputValues())}))}close(){super.close(),this._form.reset()}}const i=document.querySelector(".profile__name-button"),a=document.querySelector(".profile__button-add"),l=document.querySelector(".cards__list"),c=document.querySelector(".popup__form_profile"),d=document.querySelector(".popup__form_card"),u=document.querySelector(".form__input_type_name"),_=document.querySelector(".form__input_type_job"),p={inputSelector:".form__input",submitButtonSelector:".form__button",inactiveButtonClass:"form__button_disabled",inputErrorClass:"form__input_type-error",errorClass:"form__input-error"},h=new o(".popup_type_add-card",(e=>{E({name:e.title,link:e.link},l),h.close()}));h.setEventListeners();const m=new o(".popup_type_profile",(e=>{y.setUserInfo(e.name,e.job),m.close()}));m.setEventListeners();const f=new class extends r{open(e,t){const s=document.querySelector(".popup__image");s.src=t,s.alt=e,super.open()}}(".popup_type_preview");f.setEventListeners();const E=e=>{const t=new n(e,"#card-template",(()=>{f.open(e.name,e.link)})).createCard();b.addItem(t)},b=new class{constructor(e,t){let{items:s,renderer:n}=e;this._items=s,this._renderer=n,this._container=document.querySelector(t)}renderItems(){this._items.forEach(this._renderer)}addItem(e){this._container.prepend(e)}}({items:[{name:"Yosemite Valley",link:"https://code.s3.yandex.net/web-code/yosemite.jpg"},{name:"Lake Louise",link:"https://code.s3.yandex.net/web-code/lake-louise.jpg"},{name:"Bald Mountains",link:"https://code.s3.yandex.net/web-code/bald-mountains.jpg"},{name:"Latemar",link:"https://code.s3.yandex.net/web-code/latemar.jpg"},{name:"Vanoise National Park",link:"https://code.s3.yandex.net/web-code/vanoise.jpg"},{name:"Lago di Braies",link:"https://code.s3.yandex.net/web-code/lago.jpg"}],renderer:E},".cards__list");b.renderItems();const y=new class{constructor(e){let{profileNameSelector:t,profileJobSelector:s}=e;this._profileName=document.querySelector(t),this._profileJob=document.querySelector(s)}getUserInfo(){return{name:this._profileName.textContent,job:this._profileJob.textContent}}setUserInfo(e,t){this._profileName.textContent=e,this._profileJob.textContent=t}}({profileNameSelector:".profile__name-info",profileJobSelector:".profile__info-job"});i.addEventListener("click",(function(){const e=y.getUserInfo();m.open(),u.value=e.name,_.value=e.job,g.resetFormErrors()}));const v=document.querySelector(".form__button_disabled");a.addEventListener("click",(function(){h.open(),L.disableButton(v,p),L.resetFormErrors(d,p)}));const g=new t(p,c),L=new t(p,d);g.enableValidation(),L.enableValidation()}();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QyxtQkFBb0IsdUJBR3RCaEMsRUFBb0J2RCxpQkFBaUIsU0FBUyxXQUM1QyxNQUFNMkYsRUFBY3pCLEVBQVN3QixjQUM3QnpCLEVBQWdCdkIsT0FFaEJrQixFQUFVUCxNQUFRc0MsRUFBWTlELEtBQzlCZ0MsRUFBU1IsTUFBUXNDLEVBQVl2QixJQUM3QndCLEVBQXFCekYsaUJBQ3RCLElBRUQsTUFBTTBGLEVBQXNCN0QsU0FBU2pELGNBQWMsMEJBQ25EeUUsRUFBdUJ4RCxpQkFBaUIsU0FBUyxXQUMvQytELEVBQWFyQixPQUNib0QsRUFBcUIzRyxjQUFjMEcsRUFBcUJ2SCxHQUV4RHdILEVBQXFCM0YsZ0JBQWdCd0QsRUFBa0JyRixFQUN4RCxJQUdELE1BQU1zSCxFQUF1QixJQUFJRyxFQUFjekgsRUFBVW9GLEdBQ25Eb0MsRUFBdUIsSUFBSUMsRUFBY3pILEVBQVVxRixHQUN6RGlDLEVBQXFCdEYsbUJBQ3JCd0YsRUFBcUJ4RixrQiIsInNvdXJjZXMiOlsid2VicGFjazovL3dlYl9wcm9qZWN0XzQvLi9zcmMvc2NyaXB0cy9Gb3JtVmFsaWRhdG9yLmpzIiwid2VicGFjazovL3dlYl9wcm9qZWN0XzQvLi9zcmMvc2NyaXB0cy9DYXJkLmpzIiwid2VicGFjazovL3dlYl9wcm9qZWN0XzQvLi9zcmMvc2NyaXB0cy9Qb3B1cC5qcyIsIndlYnBhY2s6Ly93ZWJfcHJvamVjdF80Ly4vc3JjL3NjcmlwdHMvUG9wdXBXaXRoRm9ybS5qcyIsIndlYnBhY2s6Ly93ZWJfcHJvamVjdF80Ly4vc3JjL3V0aWxzL2NvbnN0YW50cy5qcyIsIndlYnBhY2s6Ly93ZWJfcHJvamVjdF80Ly4vc3JjL3BhZ2VzL2luZGV4LmpzIiwid2VicGFjazovL3dlYl9wcm9qZWN0XzQvLi9zcmMvc2NyaXB0cy9Qb3B1cFdpdGhJbWFnZS5qcyIsIndlYnBhY2s6Ly93ZWJfcHJvamVjdF80Ly4vc3JjL3NjcmlwdHMvU2VjdGlvbi5qcyIsIndlYnBhY2s6Ly93ZWJfcHJvamVjdF80Ly4vc3JjL3NjcmlwdHMvVXNlckluZm8uanMiXSwic291cmNlc0NvbnRlbnQiOlsiY2xhc3MgRm9ybVZhbGlkYXRvciB7XHJcbiAgY29uc3RydWN0b3Ioc2V0dGluZ3MsIGZvcm1FbGVtZW50KSB7XHJcbiAgICB0aGlzLnNldHRpbmdzID0gc2V0dGluZ3M7XHJcbiAgICB0aGlzLmZvcm1FbGVtZW50ID0gZm9ybUVsZW1lbnQ7XHJcbiAgfVxyXG4gIHJlc2V0Rm9ybUVycm9ycygpIHtcclxuICAgIHRoaXMuaW5wdXRMaXN0LmZvckVhY2goKGlucHV0KSA9PiB7XHJcbiAgICAgIHRoaXMuX2hpZGVJbnB1dEVycm9yKGlucHV0KTtcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgX2hhc1ZhbGlkSW5wdXRzID0gKCkgPT5cclxuICAgIHRoaXMuaW5wdXRMaXN0LmV2ZXJ5KChpbnB1dCkgPT4gaW5wdXQudmFsaWRpdHkudmFsaWQgPT09IHRydWUpO1xyXG5cclxuICBfZW5hYmxlQnV0dG9uKGJ1dHRvbikge1xyXG4gICAgYnV0dG9uLmNsYXNzTGlzdC5yZW1vdmUodGhpcy5zZXR0aW5ncy5pbmFjdGl2ZUJ1dHRvbkNsYXNzKTtcclxuICAgIGJ1dHRvbi5kaXNhYmxlZCA9IGZhbHNlO1xyXG4gIH1cclxuICBkaXNhYmxlQnV0dG9uKGJ1dHRvbikge1xyXG4gICAgYnV0dG9uLmNsYXNzTGlzdC5hZGQodGhpcy5zZXR0aW5ncy5pbmFjdGl2ZUJ1dHRvbkNsYXNzKTtcclxuICAgIGJ1dHRvbi5kaXNhYmxlZCA9IHRydWU7XHJcbiAgfVxyXG4gIF90b2dnbGVCdXR0b24gPSAoKSA9PiB7XHJcbiAgICBjb25zdCBidXR0b24gPSB0aGlzLmZvcm1FbGVtZW50LnF1ZXJ5U2VsZWN0b3IoXHJcbiAgICAgIHRoaXMuc2V0dGluZ3Muc3VibWl0QnV0dG9uU2VsZWN0b3JcclxuICAgICk7XHJcbiAgICBpZiAodGhpcy5faGFzVmFsaWRJbnB1dHMoKSkge1xyXG4gICAgICB0aGlzLl9lbmFibGVCdXR0b24oYnV0dG9uKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRoaXMuZGlzYWJsZUJ1dHRvbihidXR0b24pO1xyXG4gICAgfVxyXG4gIH07XHJcbiAgX3Nob3dJbnB1dEVycm9yID0gKGlucHV0KSA9PiB7XHJcbiAgICBjb25zdCB7IGlucHV0RXJyb3JDbGFzcyB9ID0gdGhpcy5zZXR0aW5ncztcclxuICAgIGNvbnN0IGVycm9yRWwgPSB0aGlzLmZvcm1FbGVtZW50LnF1ZXJ5U2VsZWN0b3IoYCMke2lucHV0LmlkfS1lcnJvcmApO1xyXG4gICAgZXJyb3JFbC50ZXh0Q29udGVudCA9IGlucHV0LnZhbGlkYXRpb25NZXNzYWdlO1xyXG4gICAgaW5wdXQuY2xhc3NMaXN0LmFkZChpbnB1dEVycm9yQ2xhc3MpO1xyXG4gIH07XHJcbiAgX2hpZGVJbnB1dEVycm9yID0gKGlucHV0KSA9PiB7XHJcbiAgICBjb25zdCB7IGlucHV0RXJyb3JDbGFzcyB9ID0gdGhpcy5zZXR0aW5ncztcclxuICAgIGNvbnN0IGVycm9yRWwgPSB0aGlzLmZvcm1FbGVtZW50LnF1ZXJ5U2VsZWN0b3IoYCMke2lucHV0LmlkfS1lcnJvcmApO1xyXG4gICAgZXJyb3JFbC50ZXh0Q29udGVudCA9IFwiXCI7XHJcbiAgICBpbnB1dC5jbGFzc0xpc3QucmVtb3ZlKGlucHV0RXJyb3JDbGFzcyk7XHJcbiAgfTtcclxuICBfY2hlY2tJbnB1dFZhbGlkaXR5ID0gKGlucHV0KSA9PiB7XHJcbiAgICBpZiAoaW5wdXQudmFsaWRpdHkudmFsaWQpIHtcclxuICAgICAgdGhpcy5faGlkZUlucHV0RXJyb3IoaW5wdXQpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGhpcy5fc2hvd0lucHV0RXJyb3IoaW5wdXQsIGlucHV0LnZhbGlkYXRpb25NZXNzYWdlKTtcclxuICAgIH1cclxuICB9O1xyXG4gIF9zZXRFdmVudExpc3RlbmVyID0gKCkgPT4ge1xyXG4gICAgY29uc3QgeyBpbnB1dFNlbGVjdG9yIH0gPSB0aGlzLnNldHRpbmdzO1xyXG4gICAgdGhpcy5pbnB1dExpc3QgPSBbLi4udGhpcy5mb3JtRWxlbWVudC5xdWVyeVNlbGVjdG9yQWxsKGlucHV0U2VsZWN0b3IpXTtcclxuXHJcbiAgICB0aGlzLmlucHV0TGlzdC5mb3JFYWNoKChpbnB1dCkgPT4ge1xyXG4gICAgICBpbnB1dC5hZGRFdmVudExpc3RlbmVyKFwiaW5wdXRcIiwgKCkgPT4ge1xyXG4gICAgICAgIHRoaXMuX2NoZWNrSW5wdXRWYWxpZGl0eShpbnB1dCk7XHJcbiAgICAgICAgdGhpcy5fdG9nZ2xlQnV0dG9uKCk7XHJcbiAgICAgIH0pO1xyXG4gICAgfSk7XHJcbiAgfTtcclxuICBlbmFibGVWYWxpZGF0aW9uKCkge1xyXG4gICAgdGhpcy5mb3JtRWxlbWVudC5hZGRFdmVudExpc3RlbmVyKFwic3VibWl0XCIsIChldnQpID0+IGV2dC5wcmV2ZW50RGVmYXVsdCgpKTtcclxuICAgIHRoaXMuX3NldEV2ZW50TGlzdGVuZXIodGhpcy5mb3JtRWxlbWVudCwgdGhpcy5zZXR0aW5ncyk7XHJcbiAgfVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBGb3JtVmFsaWRhdG9yO1xyXG4iLCJleHBvcnQgY2xhc3MgQ2FyZCB7XHJcbiAgY29uc3RydWN0b3IoZGF0YSwgY2FyZFRlbXBsYXRlU2VsZWN0b3IsIGhhbmRsZUltYWdlQ2xpY2spIHtcclxuICAgIHRoaXMuX2RhdGEgPSBkYXRhO1xyXG4gICAgdGhpcy5fY2FyZFRlbXBsYXRlU2VsZWN0b3IgPSBjYXJkVGVtcGxhdGVTZWxlY3RvcjtcclxuICAgIHRoaXMuX2hhbmRsZUltYWdlQ2xpY2sgPSBoYW5kbGVJbWFnZUNsaWNrO1xyXG4gIH1cclxuICBfZ2V0VGVtcGxhdGUoKSB7XHJcbiAgICByZXR1cm4gZG9jdW1lbnRcclxuICAgICAgLnF1ZXJ5U2VsZWN0b3IodGhpcy5fY2FyZFRlbXBsYXRlU2VsZWN0b3IpXHJcbiAgICAgIC5jb250ZW50LnF1ZXJ5U2VsZWN0b3IoXCIuY2FyZFwiKTtcclxuICB9XHJcbiAgX2hhbmRsZUNhcmREZWxldGVCdXR0b24gPSAoKSA9PiB0aGlzLl9jYXJkRWxlbWVudC5yZW1vdmUoKTtcclxuXHJcbiAgX2hhbmRsZUxpa2VCdXR0b24gPSAoZXZ0KSA9PiB7XHJcbiAgICBldnQudGFyZ2V0LmNsYXNzTGlzdC50b2dnbGUoXCJjYXJkX19saWtlLWJ1dHRvbl9maWxsZWRcIik7XHJcbiAgfTtcclxuXHJcbiAgX2FkZEV2ZW50TGlzdGVuZXJzID0gKCkgPT4ge1xyXG4gICAgdGhpcy5fY2FyZEltYWdlLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB0aGlzLl9oYW5kbGVJbWFnZUNsaWNrKCkpO1xyXG4gICAgdGhpcy5fY2FyZERlbGV0ZUJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKFxyXG4gICAgICBcImNsaWNrXCIsXHJcbiAgICAgIHRoaXMuX2hhbmRsZUNhcmREZWxldGVCdXR0b25cclxuICAgICk7XHJcbiAgICB0aGlzLl9jYXJkTGlrZUJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgdGhpcy5faGFuZGxlTGlrZUJ1dHRvbik7XHJcbiAgfTtcclxuXHJcbiAgY3JlYXRlQ2FyZCA9ICgpID0+IHtcclxuICAgIHRoaXMuX2NhcmRFbGVtZW50ID0gdGhpcy5fZ2V0VGVtcGxhdGUoKS5jbG9uZU5vZGUodHJ1ZSk7XHJcbiAgICB0aGlzLl9jYXJkSW1hZ2UgPSB0aGlzLl9jYXJkRWxlbWVudC5xdWVyeVNlbGVjdG9yKFwiLmNhcmRfX2ltYWdlXCIpO1xyXG4gICAgdGhpcy5fY2FyZERlbGV0ZUJ1dHRvbiA9IHRoaXMuX2NhcmRFbGVtZW50LnF1ZXJ5U2VsZWN0b3IoXHJcbiAgICAgIFwiLmNhcmRfX3RyYXNoLWJ1dHRvblwiXHJcbiAgICApO1xyXG4gICAgdGhpcy5fY2FyZExpa2VCdXR0b24gPVxyXG4gICAgICB0aGlzLl9jYXJkRWxlbWVudC5xdWVyeVNlbGVjdG9yKFwiLmNhcmRfX2xpa2UtYnV0dG9uXCIpO1xyXG4gICAgdGhpcy5fY2FyZEltYWdlLnN0eWxlLmJhY2tncm91bmRJbWFnZSA9IGB1cmwoJHt0aGlzLl9kYXRhLmxpbmt9KWA7XHJcbiAgICB0aGlzLl9jYXJkRWxlbWVudC5xdWVyeVNlbGVjdG9yKFwiLmNhcmRfX3RpdGxlXCIpLnRleHRDb250ZW50ID1cclxuICAgICAgdGhpcy5fZGF0YS5uYW1lO1xyXG4gICAgdGhpcy5fYWRkRXZlbnRMaXN0ZW5lcnMoKTtcclxuICAgIHJldHVybiB0aGlzLl9jYXJkRWxlbWVudDtcclxuICB9O1xyXG59XHJcbiIsImV4cG9ydCBjbGFzcyBQb3B1cCB7XHJcbiAgY29uc3RydWN0b3IocG9wdXBTZWxlY3Rvcikge1xyXG4gICAgdGhpcy5fcG9wdXAgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKHBvcHVwU2VsZWN0b3IpO1xyXG4gICAgdGhpcy5faGFuZGxlRXNjQ2xvc2UgPSB0aGlzLl9oYW5kbGVFc2NDbG9zZS5iaW5kKHRoaXMpO1xyXG4gIH1cclxuICBfaGFuZGxlRXNjQ2xvc2UoZSkge1xyXG4gICAgaWYgKGUua2V5ID09PSBcIkVzY2FwZVwiKSB7XHJcbiAgICAgIHRoaXMuY2xvc2UoKTtcclxuICAgIH1cclxuICB9XHJcbiAgb3BlbigpIHtcclxuICAgIHRoaXMuX3BvcHVwLmNsYXNzTGlzdC5hZGQoXCJwb3B1cF9vcGVuXCIpO1xyXG4gICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcImtleWRvd25cIiwgdGhpcy5faGFuZGxlRXNjQ2xvc2UpO1xyXG4gIH1cclxuICBjbG9zZSgpIHtcclxuICAgIHRoaXMuX3BvcHVwLmNsYXNzTGlzdC5yZW1vdmUoXCJwb3B1cF9vcGVuXCIpO1xyXG4gICAgZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcihcImtleWRvd25cIiwgdGhpcy5faGFuZGxlRXNjQ2xvc2UpO1xyXG4gIH1cclxuICBzZXRFdmVudExpc3RlbmVycygpIHtcclxuICAgIHRoaXMuX3BvcHVwLmFkZEV2ZW50TGlzdGVuZXIoXCJtb3VzZWRvd25cIiwgKGV2dCkgPT4ge1xyXG4gICAgICBpZiAoXHJcbiAgICAgICAgZXZ0LnRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoXCJwb3B1cFwiKSB8fFxyXG4gICAgICAgIGV2dC50YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKFwicG9wdXBfX2Nsb3NlXCIpXHJcbiAgICAgICkge1xyXG4gICAgICAgIHRoaXMuY2xvc2UoKTtcclxuICAgICAgfVxyXG4gICAgfSk7XHJcbiAgfVxyXG59XHJcbiIsImltcG9ydCB7IFBvcHVwIH0gZnJvbSBcIi4vUG9wdXAuanNcIjtcclxuXHJcbmV4cG9ydCBjbGFzcyBQb3B1cFdpdGhGb3JtIGV4dGVuZHMgUG9wdXAge1xyXG4gIGNvbnN0cnVjdG9yKHBvcHVwU2VsZWN0b3IsIGhhbmRsZVN1Ym1pdCkge1xyXG4gICAgc3VwZXIocG9wdXBTZWxlY3Rvcik7XHJcbiAgICB0aGlzLl9oYW5kbGVTdWJtaXQgPSBoYW5kbGVTdWJtaXQ7XHJcbiAgICB0aGlzLl9mb3JtID0gdGhpcy5fcG9wdXAucXVlcnlTZWxlY3RvcihcIi5wb3B1cF9fZm9ybVwiKTtcclxuICB9XHJcbiAgX2dldElucHV0VmFsdWVzKCkge1xyXG4gICAgY29uc3QgdmFsdWVzID0ge307XHJcbiAgICBjb25zdCBpbnB1dHMgPSBbLi4udGhpcy5fZm9ybS5xdWVyeVNlbGVjdG9yQWxsKFwiLmZvcm1fX2lucHV0XCIpXTtcclxuICAgIGlucHV0cy5mb3JFYWNoKChpbnB1dCkgPT4ge1xyXG4gICAgICBjb25zdCBrZXkgPSBpbnB1dC5uYW1lO1xyXG4gICAgICBjb25zdCB2YWx1ZSA9IGlucHV0LnZhbHVlO1xyXG4gICAgICB2YWx1ZXNba2V5XSA9IHZhbHVlO1xyXG4gICAgfSk7XHJcbiAgICByZXR1cm4gdmFsdWVzO1xyXG4gIH1cclxuICBzZXRFdmVudExpc3RlbmVycygpIHtcclxuICAgIHN1cGVyLnNldEV2ZW50TGlzdGVuZXJzKCk7XHJcbiAgICB0aGlzLl9mb3JtLmFkZEV2ZW50TGlzdGVuZXIoXCJzdWJtaXRcIiwgKGUpID0+IHtcclxuICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICB0aGlzLl9oYW5kbGVTdWJtaXQodGhpcy5fZ2V0SW5wdXRWYWx1ZXMoKSk7XHJcbiAgICB9KTtcclxuICB9XHJcbiAgY2xvc2UoKSB7XHJcbiAgICBzdXBlci5jbG9zZSgpO1xyXG4gICAgdGhpcy5fZm9ybS5yZXNldCgpO1xyXG4gIH1cclxufVxyXG4iLCJleHBvcnQgY29uc3QgaW5pdGlhbENhcmRzID0gW1xyXG4gIHtcclxuICAgIG5hbWU6IFwiWW9zZW1pdGUgVmFsbGV5XCIsXHJcbiAgICBsaW5rOiBcImh0dHBzOi8vY29kZS5zMy55YW5kZXgubmV0L3dlYi1jb2RlL3lvc2VtaXRlLmpwZ1wiLFxyXG4gIH0sXHJcbiAge1xyXG4gICAgbmFtZTogXCJMYWtlIExvdWlzZVwiLFxyXG4gICAgbGluazogXCJodHRwczovL2NvZGUuczMueWFuZGV4Lm5ldC93ZWItY29kZS9sYWtlLWxvdWlzZS5qcGdcIixcclxuICB9LFxyXG4gIHtcclxuICAgIG5hbWU6IFwiQmFsZCBNb3VudGFpbnNcIixcclxuICAgIGxpbms6IFwiaHR0cHM6Ly9jb2RlLnMzLnlhbmRleC5uZXQvd2ViLWNvZGUvYmFsZC1tb3VudGFpbnMuanBnXCIsXHJcbiAgfSxcclxuICB7XHJcbiAgICBuYW1lOiBcIkxhdGVtYXJcIixcclxuICAgIGxpbms6IFwiaHR0cHM6Ly9jb2RlLnMzLnlhbmRleC5uZXQvd2ViLWNvZGUvbGF0ZW1hci5qcGdcIixcclxuICB9LFxyXG4gIHtcclxuICAgIG5hbWU6IFwiVmFub2lzZSBOYXRpb25hbCBQYXJrXCIsXHJcbiAgICBsaW5rOiBcImh0dHBzOi8vY29kZS5zMy55YW5kZXgubmV0L3dlYi1jb2RlL3Zhbm9pc2UuanBnXCIsXHJcbiAgfSxcclxuICB7XHJcbiAgICBuYW1lOiBcIkxhZ28gZGkgQnJhaWVzXCIsXHJcbiAgICBsaW5rOiBcImh0dHBzOi8vY29kZS5zMy55YW5kZXgubmV0L3dlYi1jb2RlL2xhZ28uanBnXCIsXHJcbiAgfSxcclxuXTtcclxuXHJcbi8vIGJ1dHRvbnMgYW5kIG90aGVyIERPTSBlbGVtZW50c1xyXG5cclxuZXhwb3J0IGNvbnN0IG9wZW5FZGl0TW9kYWxCdXR0b24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFxyXG4gIFwiLnByb2ZpbGVfX25hbWUtYnV0dG9uXCJcclxuKTtcclxuZXhwb3J0IGNvbnN0IG9wZW5BZGRDYXJkTW9kYWxCdXR0b24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFxyXG4gIFwiLnByb2ZpbGVfX2J1dHRvbi1hZGRcIlxyXG4pO1xyXG5leHBvcnQgY29uc3QgY2FyZHNMaXN0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5jYXJkc19fbGlzdFwiKTtcclxuXHJcbi8vIEZvcm1zXHJcblxyXG5leHBvcnQgY29uc3QgcHJvZmlsZU1vZGFsRm9ybSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIucG9wdXBfX2Zvcm1fcHJvZmlsZVwiKTtcclxuZXhwb3J0IGNvbnN0IGFkZENhcmRNb2RhbEZvcm0gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnBvcHVwX19mb3JtX2NhcmRcIik7XHJcbmV4cG9ydCBjb25zdCBpbnB1dE5hbWUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmZvcm1fX2lucHV0X3R5cGVfbmFtZVwiKTtcclxuZXhwb3J0IGNvbnN0IGlucHV0Sm9iID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5mb3JtX19pbnB1dF90eXBlX2pvYlwiKTtcclxuIiwiLy8gaW1wb3J0c1xyXG5pbXBvcnQgXCIuL2luZGV4LmNzc1wiO1xyXG5pbXBvcnQgRm9ybVZhbGlkYXRvciBmcm9tIFwiLi4vc2NyaXB0cy9Gb3JtVmFsaWRhdG9yLmpzXCI7XHJcbmltcG9ydCB7IENhcmQgfSBmcm9tIFwiLi4vc2NyaXB0cy9DYXJkLmpzXCI7XHJcbmltcG9ydCB7IFBvcHVwV2l0aEZvcm0gfSBmcm9tIFwiLi4vc2NyaXB0cy9Qb3B1cFdpdGhGb3JtLmpzXCI7XHJcbmltcG9ydCB7IFBvcHVwV2l0aEltYWdlIH0gZnJvbSBcIi4uL3NjcmlwdHMvUG9wdXBXaXRoSW1hZ2UuanNcIjtcclxuaW1wb3J0IHsgU2VjdGlvbiB9IGZyb20gXCIuLi9zY3JpcHRzL1NlY3Rpb24uanNcIjtcclxuaW1wb3J0IHsgVXNlckluZm8gfSBmcm9tIFwiLi4vc2NyaXB0cy9Vc2VySW5mby5qc1wiO1xyXG5pbXBvcnQge1xyXG4gIGluaXRpYWxDYXJkcyxcclxuICBvcGVuRWRpdE1vZGFsQnV0dG9uLFxyXG4gIG9wZW5BZGRDYXJkTW9kYWxCdXR0b24sXHJcbiAgY2FyZHNMaXN0LFxyXG4gIHByb2ZpbGVNb2RhbEZvcm0sXHJcbiAgYWRkQ2FyZE1vZGFsRm9ybSxcclxuICBpbnB1dE5hbWUsXHJcbiAgaW5wdXRKb2IsXHJcbn0gZnJvbSBcIi4uL3V0aWxzL2NvbnN0YW50cy5qc1wiO1xyXG5cclxuY29uc3Qgc2V0dGluZ3MgPSB7XHJcbiAgaW5wdXRTZWxlY3RvcjogXCIuZm9ybV9faW5wdXRcIixcclxuICBzdWJtaXRCdXR0b25TZWxlY3RvcjogXCIuZm9ybV9fYnV0dG9uXCIsXHJcbiAgaW5hY3RpdmVCdXR0b25DbGFzczogXCJmb3JtX19idXR0b25fZGlzYWJsZWRcIixcclxuICBpbnB1dEVycm9yQ2xhc3M6IFwiZm9ybV9faW5wdXRfdHlwZS1lcnJvclwiLFxyXG4gIGVycm9yQ2xhc3M6IFwiZm9ybV9faW5wdXQtZXJyb3JcIixcclxufTtcclxuXHJcbi8vIGluc3RhbmNlc1xyXG5cclxuY29uc3QgaGFuZGxlQWRkQ2FyZFN1Ym1pdCA9IChkYXRhKSA9PiB7XHJcbiAgcmVuZGVyQ2FyZCh7IG5hbWU6IGRhdGFbXCJ0aXRsZVwiXSwgbGluazogZGF0YVtcImxpbmtcIl0gfSwgY2FyZHNMaXN0KTtcclxuICBhZGRDYXJkUG9wdXAuY2xvc2UoKTtcclxufTtcclxuY29uc3QgYWRkQ2FyZFBvcHVwID0gbmV3IFBvcHVwV2l0aEZvcm0oXHJcbiAgXCIucG9wdXBfdHlwZV9hZGQtY2FyZFwiLFxyXG4gIGhhbmRsZUFkZENhcmRTdWJtaXRcclxuKTtcclxuYWRkQ2FyZFBvcHVwLnNldEV2ZW50TGlzdGVuZXJzKCk7XHJcblxyXG5jb25zdCBoYW5kbGVQcm9maWxlRm9ybVN1Ym1pdCA9IChkYXRhKSA9PiB7XHJcbiAgdXNlckluZm8uc2V0VXNlckluZm8oZGF0YS5uYW1lLCBkYXRhLmpvYik7XHJcbiAgYWRkUHJvZmlsZVBvcHVwLmNsb3NlKCk7XHJcbn07XHJcblxyXG5jb25zdCBhZGRQcm9maWxlUG9wdXAgPSBuZXcgUG9wdXBXaXRoRm9ybShcclxuICBcIi5wb3B1cF90eXBlX3Byb2ZpbGVcIixcclxuICBoYW5kbGVQcm9maWxlRm9ybVN1Ym1pdFxyXG4pO1xyXG5hZGRQcm9maWxlUG9wdXAuc2V0RXZlbnRMaXN0ZW5lcnMoKTtcclxuXHJcbmNvbnN0IGltYWdlUG9wdXAgPSBuZXcgUG9wdXBXaXRoSW1hZ2UoXCIucG9wdXBfdHlwZV9wcmV2aWV3XCIpO1xyXG5pbWFnZVBvcHVwLnNldEV2ZW50TGlzdGVuZXJzKCk7XHJcblxyXG4vLyByZW5kZXJjYXJkXHJcbmNvbnN0IGNhcmRUZW1wbGF0ZVNlbGVjdG9yID0gXCIjY2FyZC10ZW1wbGF0ZVwiO1xyXG5jb25zdCByZW5kZXJDYXJkID0gKGRhdGEpID0+IHtcclxuICBjb25zdCBjYXJkID0gbmV3IENhcmQoZGF0YSwgY2FyZFRlbXBsYXRlU2VsZWN0b3IsICgpID0+IHtcclxuICAgIGltYWdlUG9wdXAub3BlbihkYXRhLm5hbWUsIGRhdGEubGluayk7XHJcbiAgfSk7XHJcblxyXG4gIGNvbnN0IGNhcmRFbGVtZW50ID0gY2FyZC5jcmVhdGVDYXJkKCk7XHJcbiAgc2VjdGlvbi5hZGRJdGVtKGNhcmRFbGVtZW50KTtcclxufTtcclxuY29uc3Qgc2VjdGlvbiA9IG5ldyBTZWN0aW9uKFxyXG4gIHsgaXRlbXM6IGluaXRpYWxDYXJkcywgcmVuZGVyZXI6IHJlbmRlckNhcmQgfSxcclxuICBcIi5jYXJkc19fbGlzdFwiXHJcbik7XHJcbnNlY3Rpb24ucmVuZGVySXRlbXMoKTtcclxuY29uc3QgdXNlckluZm8gPSBuZXcgVXNlckluZm8oe1xyXG4gIHByb2ZpbGVOYW1lU2VsZWN0b3I6IFwiLnByb2ZpbGVfX25hbWUtaW5mb1wiLFxyXG4gIHByb2ZpbGVKb2JTZWxlY3RvcjogXCIucHJvZmlsZV9faW5mby1qb2JcIixcclxufSk7XHJcbi8vIGV2ZW50SGFuZGxlcnNcclxub3BlbkVkaXRNb2RhbEJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgZnVuY3Rpb24gKCkge1xyXG4gIGNvbnN0IHByb2ZpbGVEYXRhID0gdXNlckluZm8uZ2V0VXNlckluZm8oKTtcclxuICBhZGRQcm9maWxlUG9wdXAub3BlbigpO1xyXG5cclxuICBpbnB1dE5hbWUudmFsdWUgPSBwcm9maWxlRGF0YS5uYW1lO1xyXG4gIGlucHV0Sm9iLnZhbHVlID0gcHJvZmlsZURhdGEuam9iO1xyXG4gIHByb2ZpbGVGb3JtVmFsaWRhdG9yLnJlc2V0Rm9ybUVycm9ycygpO1xyXG59KTtcclxuXHJcbmNvbnN0IGFkZENhcmRTdWJtaXRCdXR0b24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmZvcm1fX2J1dHRvbl9kaXNhYmxlZFwiKTtcclxub3BlbkFkZENhcmRNb2RhbEJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgZnVuY3Rpb24gKCkge1xyXG4gIGFkZENhcmRQb3B1cC5vcGVuKCk7XHJcbiAgYWRkQ2FyZEZvcm1WYWxpZGF0b3IuZGlzYWJsZUJ1dHRvbihhZGRDYXJkU3VibWl0QnV0dG9uLCBzZXR0aW5ncyk7XHJcblxyXG4gIGFkZENhcmRGb3JtVmFsaWRhdG9yLnJlc2V0Rm9ybUVycm9ycyhhZGRDYXJkTW9kYWxGb3JtLCBzZXR0aW5ncyk7XHJcbn0pO1xyXG5cclxuLy8gZm9ybVxyXG5jb25zdCBwcm9maWxlRm9ybVZhbGlkYXRvciA9IG5ldyBGb3JtVmFsaWRhdG9yKHNldHRpbmdzLCBwcm9maWxlTW9kYWxGb3JtKTtcclxuY29uc3QgYWRkQ2FyZEZvcm1WYWxpZGF0b3IgPSBuZXcgRm9ybVZhbGlkYXRvcihzZXR0aW5ncywgYWRkQ2FyZE1vZGFsRm9ybSk7XHJcbnByb2ZpbGVGb3JtVmFsaWRhdG9yLmVuYWJsZVZhbGlkYXRpb24oKTtcclxuYWRkQ2FyZEZvcm1WYWxpZGF0b3IuZW5hYmxlVmFsaWRhdGlvbigpO1xyXG4iLCJpbXBvcnQgeyBQb3B1cCB9IGZyb20gXCIuL1BvcHVwLmpzXCI7XHJcblxyXG5leHBvcnQgY2xhc3MgUG9wdXBXaXRoSW1hZ2UgZXh0ZW5kcyBQb3B1cCB7XHJcbiAgb3BlbihuYW1lLCBsaW5rKSB7XHJcbiAgICBjb25zdCBpbWFnZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIucG9wdXBfX2ltYWdlXCIpO1xyXG4gICAgaW1hZ2Uuc3JjID0gbGluaztcclxuICAgIGltYWdlLmFsdCA9IG5hbWU7XHJcbiAgICBzdXBlci5vcGVuKCk7XHJcbiAgfVxyXG59XHJcbiIsImV4cG9ydCBjbGFzcyBTZWN0aW9uIHtcclxuICBjb25zdHJ1Y3Rvcih7IGl0ZW1zLCByZW5kZXJlciB9LCBjb250YWluZXJTZWxlY3Rvcikge1xyXG4gICAgdGhpcy5faXRlbXMgPSBpdGVtcztcclxuICAgIHRoaXMuX3JlbmRlcmVyID0gcmVuZGVyZXI7XHJcbiAgICB0aGlzLl9jb250YWluZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGNvbnRhaW5lclNlbGVjdG9yKTtcclxuICB9XHJcbiAgcmVuZGVySXRlbXMoKSB7XHJcbiAgICB0aGlzLl9pdGVtcy5mb3JFYWNoKHRoaXMuX3JlbmRlcmVyKTtcclxuICB9XHJcbiAgYWRkSXRlbShlbGVtZW50KSB7XHJcbiAgICB0aGlzLl9jb250YWluZXIucHJlcGVuZChlbGVtZW50KTtcclxuICB9XHJcbn1cclxuIiwiZXhwb3J0IGNsYXNzIFVzZXJJbmZvIHtcclxuICBjb25zdHJ1Y3Rvcih7IHByb2ZpbGVOYW1lU2VsZWN0b3IsIHByb2ZpbGVKb2JTZWxlY3RvciB9KSB7XHJcbiAgICB0aGlzLl9wcm9maWxlTmFtZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IocHJvZmlsZU5hbWVTZWxlY3Rvcik7XHJcbiAgICB0aGlzLl9wcm9maWxlSm9iID0gZG9jdW1lbnQucXVlcnlTZWxlY3Rvcihwcm9maWxlSm9iU2VsZWN0b3IpO1xyXG4gIH1cclxuICBnZXRVc2VySW5mbygpIHtcclxuICAgIHJldHVybiB7XHJcbiAgICAgIG5hbWU6IHRoaXMuX3Byb2ZpbGVOYW1lLnRleHRDb250ZW50LFxyXG4gICAgICBqb2I6IHRoaXMuX3Byb2ZpbGVKb2IudGV4dENvbnRlbnQsXHJcbiAgICB9O1xyXG4gIH1cclxuICBzZXRVc2VySW5mbyhuYW1lLCBqb2IpIHtcclxuICAgIHRoaXMuX3Byb2ZpbGVOYW1lLnRleHRDb250ZW50ID0gbmFtZTtcclxuICAgIHRoaXMuX3Byb2ZpbGVKb2IudGV4dENvbnRlbnQgPSBqb2I7XHJcbiAgfVxyXG59XHJcbiJdLCJuYW1lcyI6WyJjb25zdHJ1Y3RvciIsInNldHRpbmdzIiwiZm9ybUVsZW1lbnQiLCJ0aGlzIiwiaW5wdXRMaXN0IiwiZXZlcnkiLCJpbnB1dCIsInZhbGlkaXR5IiwidmFsaWQiLCJidXR0b24iLCJxdWVyeVNlbGVjdG9yIiwic3VibWl0QnV0dG9uU2VsZWN0b3IiLCJfaGFzVmFsaWRJbnB1dHMiLCJfZW5hYmxlQnV0dG9uIiwiZGlzYWJsZUJ1dHRvbiIsImlucHV0RXJyb3JDbGFzcyIsImlkIiwidGV4dENvbnRlbnQiLCJ2YWxpZGF0aW9uTWVzc2FnZSIsImNsYXNzTGlzdCIsImFkZCIsInJlbW92ZSIsIl9oaWRlSW5wdXRFcnJvciIsIl9zaG93SW5wdXRFcnJvciIsImlucHV0U2VsZWN0b3IiLCJxdWVyeVNlbGVjdG9yQWxsIiwiZm9yRWFjaCIsImFkZEV2ZW50TGlzdGVuZXIiLCJfY2hlY2tJbnB1dFZhbGlkaXR5IiwiX3RvZ2dsZUJ1dHRvbiIsInJlc2V0Rm9ybUVycm9ycyIsImluYWN0aXZlQnV0dG9uQ2xhc3MiLCJkaXNhYmxlZCIsImVuYWJsZVZhbGlkYXRpb24iLCJldnQiLCJwcmV2ZW50RGVmYXVsdCIsIl9zZXRFdmVudExpc3RlbmVyIiwiQ2FyZCIsImRhdGEiLCJjYXJkVGVtcGxhdGVTZWxlY3RvciIsImhhbmRsZUltYWdlQ2xpY2siLCJfY2FyZEVsZW1lbnQiLCJ0YXJnZXQiLCJ0b2dnbGUiLCJfY2FyZEltYWdlIiwiX2hhbmRsZUltYWdlQ2xpY2siLCJfY2FyZERlbGV0ZUJ1dHRvbiIsIl9oYW5kbGVDYXJkRGVsZXRlQnV0dG9uIiwiX2NhcmRMaWtlQnV0dG9uIiwiX2hhbmRsZUxpa2VCdXR0b24iLCJfZ2V0VGVtcGxhdGUiLCJjbG9uZU5vZGUiLCJzdHlsZSIsImJhY2tncm91bmRJbWFnZSIsIl9kYXRhIiwibGluayIsIm5hbWUiLCJfYWRkRXZlbnRMaXN0ZW5lcnMiLCJfY2FyZFRlbXBsYXRlU2VsZWN0b3IiLCJkb2N1bWVudCIsImNvbnRlbnQiLCJQb3B1cCIsInBvcHVwU2VsZWN0b3IiLCJfcG9wdXAiLCJfaGFuZGxlRXNjQ2xvc2UiLCJiaW5kIiwiZSIsImtleSIsImNsb3NlIiwib3BlbiIsInJlbW92ZUV2ZW50TGlzdGVuZXIiLCJzZXRFdmVudExpc3RlbmVycyIsImNvbnRhaW5zIiwiUG9wdXBXaXRoRm9ybSIsImhhbmRsZVN1Ym1pdCIsInN1cGVyIiwiX2hhbmRsZVN1Ym1pdCIsIl9mb3JtIiwiX2dldElucHV0VmFsdWVzIiwidmFsdWVzIiwidmFsdWUiLCJyZXNldCIsIm9wZW5FZGl0TW9kYWxCdXR0b24iLCJvcGVuQWRkQ2FyZE1vZGFsQnV0dG9uIiwiY2FyZHNMaXN0IiwicHJvZmlsZU1vZGFsRm9ybSIsImFkZENhcmRNb2RhbEZvcm0iLCJpbnB1dE5hbWUiLCJpbnB1dEpvYiIsImVycm9yQ2xhc3MiLCJhZGRDYXJkUG9wdXAiLCJyZW5kZXJDYXJkIiwiYWRkUHJvZmlsZVBvcHVwIiwidXNlckluZm8iLCJzZXRVc2VySW5mbyIsImpvYiIsImltYWdlUG9wdXAiLCJpbWFnZSIsInNyYyIsImFsdCIsImNhcmRFbGVtZW50IiwiY3JlYXRlQ2FyZCIsInNlY3Rpb24iLCJhZGRJdGVtIiwiY29udGFpbmVyU2VsZWN0b3IiLCJpdGVtcyIsInJlbmRlcmVyIiwiX2l0ZW1zIiwiX3JlbmRlcmVyIiwiX2NvbnRhaW5lciIsInJlbmRlckl0ZW1zIiwiZWxlbWVudCIsInByZXBlbmQiLCJwcm9maWxlTmFtZVNlbGVjdG9yIiwicHJvZmlsZUpvYlNlbGVjdG9yIiwiX3Byb2ZpbGVOYW1lIiwiX3Byb2ZpbGVKb2IiLCJnZXRVc2VySW5mbyIsInByb2ZpbGVEYXRhIiwicHJvZmlsZUZvcm1WYWxpZGF0b3IiLCJhZGRDYXJkU3VibWl0QnV0dG9uIiwiYWRkQ2FyZEZvcm1WYWxpZGF0b3IiLCJGb3JtVmFsaWRhdG9yIl0sInNvdXJjZVJvb3QiOiIifQ==