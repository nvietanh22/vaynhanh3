console.log('[LuckyWheel] JS loaded')
let btnSubmit = document.getElementById("btn-submit");
// let BUTTON_TEXT40 = document.getElementById("BUTTON_TEXT40");
let BUTTON_TEXT25 = document.getElementById("BUTTON_TEXT25");
let backdropPopup = document.getElementById("backdrop-popup");
const OTP_VERIFY_MESSAGE = 'OTP không chính xác. Quý khách vui lòng kiểm tra lại!';

let btnSubmitPopup = document.getElementById("btn-submit-popup");
let btnChangePhone = document.getElementById("btn-change-phone");
let isOtpFailed = false;
var myModal = new bootstrap.Modal(document.getElementById("myModal"));
var modalForm = new bootstrap.Modal(document.getElementById("modalForm"));
var modalNoti = new bootstrap.Modal(document.getElementById("modalNoti"));
var modalNotiDefault = new bootstrap.Modal(document.getElementById("modalNotiDefault"));
var modalPolicy = new bootstrap.Modal(document.getElementById("modalPolicy"));

var SHAPE31 = document.getElementById("SHAPE31");

const countdownElement = document.getElementById("countdown");
let countdownInterval;

backdropPopup.addEventListener("click", () => {
  $('#backdrop-popup').removeClass('backdrop-popup-show');
  $('#style_popup').remove();
});

BUTTON_TEXT25.addEventListener("click", () => {
  let formId = '#FORM_TEXT25';
  clearInterval(countdownInterval);
  let formData = $(formId).getValue();
  let rsValidate = this.validate(formData);
  if (!rsValidate.valid) {
    showNotiDefault('error', 'Thất bại', rsValidate.msg);
    return;
  }
  if (!formData.i_agree_terms_and_conditions) {
    showNotiDefault('error', 'Thất bại', 'Quý khách vui lòng đồng ý với chính sách & điều khoản dịch vụ!');
    return;
  }
  sendWarehouseProcessRequest(formId);
  genOtp(formId)
  startCountdown();
});

btnSubmit.addEventListener("click", () => {
  clearInterval(countdownInterval);
  let formId = '#form-submit';
  let formData = $(formId).getValue();
  let rsValidate = this.validate(formData);
  if (!rsValidate.valid) {
    showNotiDefault('error', 'Thất bại', rsValidate.msg);
    return;
  }
  if (!formData.i_agree_terms_and_conditions) {
    showNotiDefault('error', 'Thất bại', 'Quý khách vui lòng đồng ý với chính sách & điều khoản dịch vụ!');
    return;
  }
  sendWarehouseProcessRequest(formId);
  genOtp(formId)
  startCountdown();
});

$('#BUTTON_TEXT26').click(function(event) {
  event.preventDefault()
  modalForm.show();
});

$('#BUTTON_TEXT22').click(function(event) {
  event.preventDefault()
  modalForm.show();
});

$('#BUTTON_TEXT23').click(function(event) {
  event.preventDefault()
  modalForm.show();
});

$('#BUTTON_TEXT24').click(function(event) {
  event.preventDefault()
  modalForm.show();
});

$('#BUTTON_TEXT11').click(function(event) {
  event.preventDefault()
  modalForm.show();
});

$('#BUTTON_TEXT20').click(function(event) {
  event.preventDefault()
  modalForm.show();
});

$('#BUTTON_TEXT21').click(function(event) {
  event.preventDefault()
  modalForm.show();
});

$('#BUTTON_TEXT43').click(function(event) {
  event.preventDefault()
  modalForm.show();
});

$('#BUTTON_TEXT29').click(function(event) {
  event.preventDefault()
  modalForm.show();
});

$('#BUTTON_TEXT10').click(function(event) {
  event.preventDefault()
  modalForm.show();
});

$('#IMAGE142').click(function(event) {
  event.preventDefault()
  modalForm.show();
});

$('#IMAGE142').click(function(event) {
  event.preventDefault()
  modalForm.show();
});

$('#BUTTON_TEXT28').click(function(event) {
  event.preventDefault()
  modalForm.show();
});

$('#BUTTON_TEXT28').click(function(event) {
  event.preventDefault()
  modalForm.show();
});

$('#BUTTON_TEXT46').click(function(event) {
  event.preventDefault()
  modalForm.show();
});

$('#BUTTON_TEXT46').click(function(event) {
  event.preventDefault()
  modalForm.show();
});


$('#btn-close-noti').click(() => {
  let classArr = $('#noti-icon-error').attr('class');
  if (classArr.indexOf('d-none') <= 0) {
    if (isOtpFailed) {
      myModal.show()
    } else {
      modalForm.show();
    }
  }
  modalNoti.hide();
})

$('#btn-close-noti-default').click(() => {
  if (isOtpFailed) {
    myModal.show()
  } 
  modalNotiDefault.hide();
})

$('#policy-info').click(() => {
  modalForm.hide();
  modalPolicy.show()
})



function showBackpop() {
  let backdropStype = `<style id="style_popup" type="text/css">#backdrop-popup { display: block; background-color: rgba(0, 0, 0, 0.5);}body {position: fixed !important;width: 100% !important;top: -0px !important;}</style>`;
  $('head').append(backdropStype);
}

function hideBackpop() {
  $('#style_popup').remove();
}


btnSubmitPopup.addEventListener("click", (event) => {
  event.preventDefault()
  clearInterval(countdownInterval);
  modalForm.hide();
  let formId = '#form-submit-popup';
  let formData = $(formId).getValue();
  let rsValidate = this.validate(formData);
  if (!rsValidate.valid) {
    showNoti('error', 'Thất bại', rsValidate.msg);
    return;
  }
  if (!formData.i_agree_terms_and_conditions) {
    showNoti('error', 'Thất bại', 'Quý khách vui lòng đồng ý với chính sách & điều khoản dịch vụ!');
    return;
  }
  sendWarehouseProcessRequest(formId);
  genOtp(formId)
  startCountdown();
});

async function genOtp(prevForm) {
  isOtpFailed = false;
  hideBackpop();
  grecaptcha.ready(function () {
    grecaptcha
      .execute("6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI", { action: "submit" })
      .then(function (token) {
        $('#loading').show();
        let validateUrl = `${env.backEndApi}/api/lead/validate`;
        let formData = $(prevForm).getValue();
        let dataValidate = {
          request_id: uuidv4(),
          contact_number: formData.phone,
          national_id: formData.idCard
        }
        lib.post({
          url: validateUrl,
          token: token,
          data: JSON.stringify(dataValidate),
          complete: function (response) {
            $('#loading').hide();
            let dataRes = response.responseJSON;
            if (dataRes.rslt_cd === 's' && dataRes.reason_code === '0') {
              grecaptcha.ready(function () {
                grecaptcha
                  .execute("6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI", { action: "submit" })
                  .then(function (token) {
                    $('#loading').show();
                    let urlOtp = `${env.backEndApi}/api/otp/gen-otp`;
                    let formData = $(prevForm).getValue();
                    let dataOtp = {
                      TransId: uuidv4(),
                      Data: {
                        phone: formData.phone,
                        idCard: formData.idCard
                      }
                    }
            
                    lib.post({
                      url: urlOtp,
                      token: token,
                      data: JSON.stringify(dataOtp),
                      complete: function (response) {
                        console.log('Response otp', response)
                        let dataRes = response.responseJSON;
                        if (dataRes.data.result.status && dataRes.data.result.value) {
                          myModal.toggle();
                          $('#prev-form').val(prevForm);
                        } else if (!dataRes.data.result.status) {
                          if (prevForm == '#form-submit' || prevForm == '#FORM_TEXT25') {
                            showNotiDefault('error', 'Thất bại', dataRes.errorMessage);
                          } else {
                            showNoti('error', 'Thất bại', dataRes.errorMessage);
                          }
                        } else if (dataRes.data.result.status && !dataRes.data.result.value) {
                          if (prevForm == '#form-submit' || prevForm == '#FORM_TEXT25') {
                            showNotiDefault('error', 'Thất bại', 'Tạo Mã OTP không thành công, Vui lòng thử lại sau');
                          } else {
                            showNoti('error', 'Thất bại', 'Tạo Mã OTP không thành công, Vui lòng thử lại sau');
                          }
                        } else {
                          if (prevForm == '#form-submit' || prevForm == '#FORM_TEXT25') {
                            showNotiDefault('error', 'Thất bại', dataRes.errorMessage);
                          } else {
                            showNoti('error', 'Thất bại', dataRes.errorMessage);
                          }
                        }
                        $('#loading').hide();
                      },
                      error: function (ex) {
                        if (prevForm == '#form-submit' || prevForm == '#FORM_TEXT25') {
                          showNotiDefault('error', 'Thất bại', ex.responseJSON ? ex.responseJSON.errorMessage : 'Đăng ký chưa thành công, vui lòng kiểm tra lại thông tin');
                        } else {
                          showNoti('error', 'Thất bại', ex.responseJSON ? ex.responseJSON.errorMessage : 'Đăng ký chưa thành công, vui lòng kiểm tra lại thông tin');
                        }
                        
                        $('#loading').hide();
                      },
                    });
                  });
              });
            } else {
              if (prevForm == '#form-submit' || prevForm == '#FORM_TEXT25') {
                showNotiDefault('error', 'Thất bại', 'Số điện thoại của Quý khách đã có trong hệ thống của chúng tôi, Vui lòng gọi Hotline 1900 633 070 để được hỗ trợ!');

              } else {
                showNoti('error', 'Thất bại', 'Số điện thoại của Quý khách đã có trong hệ thống của chúng tôi, Vui lòng gọi Hotline 1900 633 070 để được hỗ trợ!');
              }
            }
            $('#loading').hide();
          },
          error: function (ex) {
            if (prevForm == '#form-submit' || prevForm == '#FORM_TEXT25') {
              showNotiDefault('error', 'Thất bại', ex.responseJSON &&  ex.responseJSON.rslt_cd == 'f'? 'Số điện thoại của Quý khách đã có trong hệ thống của chúng tôi, Vui lòng gọi Hotline 1900 633 070 để được hỗ trợ!'
                : 'Đăng ký chưa thành công, vui lòng kiểm tra lại thông tin!');
            } else {
              showNoti('error', 'Thất bại', ex.responseJSON && ex.responseJSON.rslt_cd == 'f'? 'Số điện thoại của Quý khách đã có trong hệ thống của chúng tôi, Vui lòng gọi Hotline 1900 633 070 để được hỗ trợ!'
                : 'Đăng ký chưa thành công, vui lòng kiểm tra lại thông tin!');
            }
            $('#loading').hide();
          },
        });
      })
  });
}

function sendWarehouseProcessRequest(prevForm, otpStatus = "Thất bại") {
  grecaptcha.ready(function () {
    grecaptcha
        .execute("6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI", {action: "submit"})
        .then(function (token) {
          $('#loading').show();
          let formData = $(prevForm).getValue();
          console.log("start request")
          const requestData = {
            custName: formData.name,
            idCard: formData.idCard,
            phoneNumber: formData.phone,
            custAddress: "",
            salaryType: formData.salaryType,
            timeCall: formData.timeCall1 ? formData.timeCall1 : formData.timeCall2,
            otpStatus: otpStatus,
            cicStatus: "",
            obtStatus: "",
            metadata: "",
            createdDate: ""
          };
          let url = `${env.backEndApi}/api/warehouse/process`;
          lib.post({
            url: url,
            token: token,
            data: JSON.stringify(requestData),
            complete: function (response) {
              $('#loading').hide();
            },
            error: function (error) {
              $('#loading').hide();
              showNoti('error', 'Thất bại', error.responseJSON?.message || 'Không thể gửi yêu cầu đến server!');
            }
          });
        })
  });
  console.log("Done")
}

function verifyOtp(otpDegit) {
  grecaptcha.ready(function () {
    grecaptcha
      .execute("6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI", { action: "submit" })
      .then(function (token) {
        $('#loading').show();
        let urlOtp = `${env.backEndApi}/api/otp/verify-otp`;
        let formId = $('#prev-form').val();
        let formData = $(formId).getValue();
        
        let otpCode = `${otpDegit.code01}${otpDegit.code02}${otpDegit.code03}${otpDegit.code04}${otpDegit.code05}${otpDegit.code06}`;
        let dataOtp = {
          TransId: uuidv4(),
          Data: {
            phone: formData.phone,
            otp: otpCode
          }
        }
        lib.post({
          token: token,
          url: urlOtp,
          data: JSON.stringify(dataOtp),
          complete: function (response) {
            let dataRes = response.responseJSON;
            if (dataRes.data.result.status && dataRes.data.result.value && dataRes.data.result.authentication === 'ACCEPT') {
              grecaptcha.ready(function () {
                isOtpFailed = false;
                grecaptcha
                  .execute("6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI", { action: "submit" })
                  .then(function (token) {
                    $('#prev-form').val('');
                    var navigator_info = window.navigator;
                    var screen_info = window.screen;
                    var deviceId = navigator_info.mimeTypes.length;
                    deviceId += navigator_info.userAgent.replace(/\D+/g, "");
                    deviceId += navigator_info.plugins.length;
                    deviceId += screen_info.height || "";
                    deviceId += screen_info.width || "";
                    deviceId += screen_info.pixelDepth || "";

                    var urlSearchParams = new URLSearchParams(window.location.search);
                    var submitdata = urlSearchParams.get('utm_source');
                    var utmMedium = urlSearchParams.get('utm_medium');
                    var utmCampaign = urlSearchParams.get('utm_campaign');
                    var utmContent = urlSearchParams.get('utm_content')
                    var clickId = '';
                    var gclid = urlSearchParams.get('gclid');
                    var fbclid = urlSearchParams.get('fbclid');
                    var ttclid = urlSearchParams.get('ttclid');

                    if (gclid) {
                      clickId = gclid;
                    } else if (fbclid) {
                      clickId = fbclid;
                    } else if (ttclid) {
                      clickId = ttclid
                    }

                    var dataNote = {
                      cmnd: formData.idCard,
                      province: formData.livingPlace,
                      score: utmMedium,
                      isdn: utmCampaign,
                      income_amount: formData.salaryType,
                      email: null,
                      gender: null,
                      submitdata: submitdata,
                      oldloan: utmContent,
                      income: formData.timeCall1 ? formData.timeCall1 : formData.timeCall2,
                      lead_id: formData.referenceInfo,
                      company: clickId,
                      obt: "OTP thành công",
                      personalData: "Đồng ý để LFVN sử dụng DLCN cho mục đích quảng cáo, truyền thông"
                    };

                    let data = {
                      request_id: uuidv4(),
                      device: "01",
                      fullname: formData.name,
                      birthday: null,
                      contact_number: formData.phone,
                      note: JSON.stringify(dataNote),
                    };
                    const timeCallValue = formData.timeCall1 ? formData.timeCall1 : formData.timeCall2;

                    let url = `${env.backEndApi}/api/lead/send`;
                    lib.post({
                      token: token,
                      url: url,
                      data: JSON.stringify(data),
                      complete: function (response) {
                        $('#loading').hide();
                        sendWarehouseProcessRequest(formId, "Thành công")
                        if (timeCallValue === "Tư vấn ngay") {
                          showNoti('success', 'Đăng ký thành công', "Quý khách vui lòng gọi Hotline 1900 633 070 để được tư vấn ngay");
                          hideModal();
                        }
                        else {
                          showNoti('success', 'Thành công', 'Cảm ơn Quý khách đã đăng ký thông tin. Chúng tôi sẽ liên hệ lại sớm nhất!');
                          hideModal();
                        }
                      },
                      error: function (ex) {
                        $('#loading').hide();
                        if (formId == '#form-submit' || formId == '#FORM_TEXT25') {
                          showNotiDefault('error', 'Thất bại', 'Đăng ký chưa thành công, vui lòng kiểm tra lại thông tin');
                        } else {
                          showNoti('error', 'Thất bại', 'Đăng ký chưa thành công, vui lòng kiểm tra lại thông tin');
                        }
                        hideModal();
                      },
                    });
                  });
              });
            } else {
              isOtpFailed = true;
              $('#loading').hide();
              if (formId == '#form-submit' || formId == '#FORM_TEXT25') {
                if (!dataRes.data.result.status) {
                  showNotiDefault('error', 'Thất bại', 'OTP của Quý khách nhập chưa đúng hoặc đã hết thời hạn sử dụng, vui lòng đăng ký lại!');
                } else if (!dataRes.data.result.value) {
                  showNotiDefault('error', 'Thất bại', 'OTP của Quý khách nhập chưa đúng hoặc đã hết thời hạn sử dụng, vui lòng đăng ký lại!');
                } else {
                  showNotiDefault('error', 'Thất bại', dataRes.errorMessage);
                }
              } else {
                isOtpFailed = true;
                if (!dataRes.data.result.status) {
                  showNoti('error', 'Thất bại', 'OTP của Quý khách nhập chưa đúng hoặc đã hết thời hạn sử dụng, vui lòng đăng ký lại!');
                } else if (!dataRes.data.result.value) {
                  showNoti('error', 'Thất bại', 'OTP của Quý khách nhập chưa đúng hoặc đã hết thời hạn sử dụng, vui lòng đăng ký lại!');
                } else {
                  showNoti('error', 'Thất bại', dataRes.errorMessage);
                }
              }
            }
          },
          error: function (ex) {
            $('#loading').hide();
            if (formId == '#form-submit' || formId == '#FORM_TEXT25') {
              showNotiDefault('error', 'Thất bại', ex.responseJSON ? ex.responseJSON.errorMessage : 'Xác thực OTP chưa thành công, Quý khách vui lòng thử lại!');
            } else {
              showNoti('error', 'Thất bại', ex.responseJSON ? ex.responseJSON.errorMessage : 'Xác thực OTP chưa thành công, Quý khách vui lòng thử lại!');
            }
          },
        });
      })
  });
}

btnChangePhone.addEventListener("click", () => {
  hideModal();
});

function uuidv4() {
  return "10000000-1000-4000-8000-100000000000".replace(/[018]/g, (c) =>
    (
      c ^
      (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (c / 4)))
    ).toString(16)
  );
}

function hideModal() {
  clearInterval(countdownInterval);
  myModal.hide();
}

function validate(formData) {
  let rs = {
    valid: true,
    msg: "",
  };

  let comma = "";
  let message = "";

  if(!formData.idCard) {
    rs.valid = false;
    message += `${comma} Số CCCD là bắt buộc`;
    comma = ', <br/>';
  } else if (!lib.validateIdCard(formData.idCard)){
    rs.valid = false;
    message += `${comma} Số CCCD không đúng định dạng`;
    comma = ', <br/>';
  } else if (!lib.validateIdCardToRegister(formData.idCard).isValid) {
    rs.valid = false;
    message += `${comma} Độ tuổi theo số CCCD của Quý khách không nằm trong độ tuổi được cung cấp khoản vay của LOTTE Finance`;
    comma = ', <br/>';
  }

  if(!formData.name) {
    rs.valid = false;
    message += `${comma} Họ và Tên là bắt buộc`;
    comma = ', <br/>';
  }

  if(!formData.salaryType || formData.salaryType == 0) {
    rs.valid = false;
    message += `${comma} Nhóm khách hàng là bắt buộc`;
    comma = ', <br/>';
  }

  if (!formData.timeCall1 && !formData.timeCall2) {
    rs.valid = false;
    message += `${comma} Thời gian nhận cuộc gọi là bắt buộc`;
    comma = ', <br/>';
  }

  if (!formData.phone) {
    rs.valid = false;
    message += `${comma} Số điện thoại là bắt buộc`;
    comma = ', <br/>';
  } else if (!lib.validatePhoneNumber(formData.phone)) {
    rs.valid = false;
    message += `${comma} Số điện thoại không đúng định dạng`;
    comma = ', <br/>';
  }

  if (message != '') {
    message += '. Quý khách vui lòng kiểm tra lại thông tin';
  }
  rs.msg = message;
  return rs;
}

// === OTP
$('.otp-input').on('input', function () {
  let regexNum = /^\d+$/; 
  let valueOtp = $(this).val();
  if (!regexNum.test(valueOtp)) {
    $(this).val(null)
    return;
  } 
  if (valueOtp < 0) {
    $(this).val(null)
    return;
  }

  if (valueOtp > 9) {
    $(this).val(null)
    return;
  }
  // Move to the next input field when a digit is entered
  var maxLength = parseInt($(this).attr('maxlength'));
  var currentLength = $(this).val().length;

  if (currentLength >= maxLength) {
    // Find the next input field
    var index = $('.otp-input').index(this);
    var nextInput = $('.otp-input').eq(index + 1);

    // Focus on the next input field
    if (nextInput.length) {
      nextInput.focus();
    }
  }
  let code01 = $('#otp-01').val();
  let code02 = $('#otp-02').val();
  let code03 = $('#otp-03').val();
  let code04 = $('#otp-04').val();
  let code05 = $('#otp-05').val();
  let code06 = $('#otp-06').val();

  if (code01 && code02 && code03 && code04 && code05 && code06) {
    let otpDegit = {
      code01: code01,
      code02: code02,
      code03: code03,
      code04: code04,
      code05: code05,
      code06: code06
    }
    verifyOtp(otpDegit);
  }
});

$("#myModal").on("hidden.bs.modal", function () {
  $('#otp-01').val(null);
  $('#otp-02').val(null);
  $('#otp-03').val(null);
  $('#otp-04').val(null);
  $('#otp-05').val(null);
  $('#otp-06').val(null);
  $('#otp-01').focus();
});

function startCountdown() {
  const countdownTimeInMinutes = 5;
  const endTime = new Date().getTime() + countdownTimeInMinutes * 60 * 1000;
  function updateCountdown() {
    const currentTime = new Date().getTime();
    const timeDifference = endTime - currentTime;

    if (timeDifference > 0) {
      const minutes = Math.floor(
        (timeDifference % (1000 * 60 * 60)) / (1000 * 60)
      );
      const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);

      if (seconds < 10) {
        countdownElement.innerHTML = `${minutes}:0${seconds}`;
      } else {
        countdownElement.innerHTML = `${minutes}:${seconds}`;
      }
    } else {
      clearInterval(countdownInterval);
      countdownElement.innerHTML = "Hết hạn nhập thông tin OTP!";
      myModal.hide();
    }
  }

  updateCountdown();
  countdownInterval = setInterval(updateCountdown, 1000);


  function hideBackdrop() {
    $('#backdrop-popup').attr('style', 'display: none !important');
  }
}


function changeStyleDropdown(arr) {
  arr.forEach(item => {
    $(`#${item.id}`).removeAttr('style')
    $(`#${item.id}`).css(item.style)
  })
}

SHAPE31.addEventListener("click", () => {
  let style = $('#PARAGRAPH138').attr('style');
  if (style !== 'display: block !important;') {
    let arrStyle = [
      {
        id: 'PARAGRAPH138',
        style: {
          display: 'block !important'
        }
      },
      {
        id: 'SECTION11',
        style: {
          height: '611.274px'
        }
      },
      {
        id: 'LINE73',
        style: {
          top: '332.027px'
        }
      },
      {
        id: 'GROUP151',
        style: {
          height: '80.2153px'
        }
      },
      {
        id: 'GROUP154',
        style: {
          top: '303.786px',
          height: '25.6076px'
        }
      },
      {
        id: 'LINE76',
        style: {
          top: '379.502px'
        }
      },
      {
        id: 'LINE72',
        style: {
          style: {
            top: '419.196px'
          }
        }
      },
      {
        id: 'LINE71',
        style: {
          style: {
            top: '229.571px'
          }
        }
      },
      {
        id: 'LINE75',
        style: {
          top: '521.747px'
        }
      },
      {
        id: 'LINE74',
        style: {
          top: '426.93px'
        }
      },
      {
        id: 'GROUP156',
        style: {
          top: '493.731px',
          height: '25.6076px'
        }
      },
      {
        id: 'GROUP155',
        style: {
          top: '446.328px',
          height: '25.6076px'
        }
      },
      {
        id: 'GROUP153',
        style: {
          top: '398.9px',
          height: '25.6076px'
        }
      },
      {
        id: 'GROUP152',
        style: {
          top: '351.425px',
          height: '25.6076px'
        }
      },
      {
       id: 'GROUP157',
       style: {
        top: '541.145px',
        height: '25.6076px'
       } 
      },
      {
        id: 'LINE96',
        style: {
          top: '566.77px'
        }
      }
    ];
    // this.changeStyleDropdown(arrStyle);
  }
});

function showNoti(type, title, message) {
  modalNoti.show();
  // myModal.hide();
  $('#noti-title').text(title);
  if (type == 'success') {
    $('#noti-icon-error').addClass('d-none');
    $('#noti-icon-success').removeClass('d-none');
    $('#btn-close-noti').text('Đóng');
    if ($("#lead-submit-success").length === 0) {
      $("#lead-result").append("<p id='lead-submit-success'></p>");
    }
  } else {
    $('#noti-icon-success').addClass('d-none');
    $('#noti-icon-error').removeClass('d-none');
    $('#btn-close-noti').text('Quay lại');
    $('#lead-result #lead-submit-success').remove();
  }
  $('#noti-message').html(message)
}

function showNotiDefault(type, title, message) {
modalNotiDefault.show();
// myModal.hide();
$('#noti-title-default').text(title);
if (type == 'success') {
  $('#noti-icon-error-default').addClass('d-none');
  $('#noti-icon-success-default').removeClass('d-none');
  $('#btn-close-noti-default').text('Đóng');
  if ($("#lead-submit-success").length === 0) {
    $("#lead-result").append("<p id='lead-submit-success'></p>");
  }
} else {
  $('#noti-icon-success-default').addClass('d-none');
  $('#noti-icon-error-default').removeClass('d-none');
  $('#btn-close-noti-default').text('Quay lại');
  $('#lead-result #lead-submit-success').remove();
}
$('#noti-message-default').html(message)
}

$('#formWebTimeCall1').click(() => {
  $('#FORM_ITEM701').show();
  $('#FORM_ITEM7011').hide();
  $('select[name="timeCall1"]').prop('disabled', false)
  $('select[name="timeCall2"]').val(null)

});


$('#formWebTimeCall2').click(() => {
  $('#FORM_ITEM701').hide();
  $('#FORM_ITEM7011').show();
  $('select[name="timeCall2"]').prop('disabled', false)
  $('select[name="timeCall1"]').val(null)
})

$('#formMobileTimeCall1').click(() => {
  $('#FORM_ITEM101').show();
  $('#FORM_ITEM1011').hide();
  $('select[name="timeCall1"]').prop('disabled', false)
  $('select[name="timeCall2"]').val(null)

});


$('#formMobileTimeCall2').click(() => {
  $('#FORM_ITEM101').hide();
  $('#FORM_ITEM1011').show();
  $('select[name="timeCall2"]').prop('disabled', false)
  $('select[name="timeCall1"]').val(null)
})

$('#formModalTimeCall1').click(() => {
  $('#formModalSelectTimeCall1').show();
  $('#formModalSelectTimeCall2').addClass('d-none');
  $('#formModalSelectTimeCall1').prop('disabled', false)
  $('#formModalSelectTimeCall2').val(null)

});


$('#formModalTimeCall2').click(() => {
  $('#formModalSelectTimeCall1').hide();
  $('#formModalSelectTimeCall2').removeClass('d-none');
  $('#formModalSelectTimeCall2').prop('disabled', false)
  $('#formModalSelectTimeCall1').val(null)

})


// lucky wheel form

var modalLuckyWheel;
let luckyWheelApiToken = null;
let luckyWheelTransId = null;
let availablePrices = [];
let selectedPrice;

let allWheelSegments = [];

const WHEEL_CONFIG = {

  prizeInfo: {
    '10000': { text: '10K', name: '10K' },
    '20000': { text: '20K', name: '20K' },
    '50000': { text: '50K', name: '50K' },
    '100000': { text: '100K', name: '100K' },
    'default': { text: 'MAY MẮN LẦN SAU', name: 'MAY MẮN LẦN SAU' }
  },

  prizeRatio: {
    '10000': 0.5,
    '20000': 0.1,
    '50000': 0.0,

    // '100000': 0.05,
    'MMLSau': 0.4
  },
  // Style cho từng vị trí ô (chẵn/lẻ)
  slotStyles: {
    prize_even: 'font-size: 30px; color: #e7252b;', // Giải thưởng trên nền trắng
    prize_odd: 'font-size: 30px;',              // Giải thưởng trên nền đỏ
    mmls_even: 'color: #e7252b;',             // MMLSau trên nền trắng
    mmls_odd: ''                                // MMLSau trên nền đỏ
  }
};


const distributePrizes = (currentAvailablePrices) => {
  const totalSlots = 10;
  let distributedPrizes = [];

  // Lọc ra các giải thưởng có trong kho VÀ có tỉ lệ > 0
  const validPrizeTypes = Object.keys(WHEEL_CONFIG.prizeInfo)
      .filter(price => price !== 'default' && currentAvailablePrices.includes(price) && WHEEL_CONFIG.prizeRatio[price] > 0);


  const totalAvailableRatio = validPrizeTypes.reduce((sum, price) => sum + WHEEL_CONFIG.prizeRatio[price], 0);
  const mmlsRatio = WHEEL_CONFIG.prizeRatio['MMLSau'];
  const totalRatio = totalAvailableRatio + mmlsRatio;

  let slotsFilled = 0;


  validPrizeTypes.forEach(price => {
    const normalizedRatio = WHEEL_CONFIG.prizeRatio[price] / totalRatio;
    const slotsForThisPrize = Math.round(normalizedRatio * totalSlots);
    for (let i = 0; i < slotsForThisPrize; i++) {
      if (slotsFilled < totalSlots) {
        distributedPrizes.push({ value: price, name: WHEEL_CONFIG.prizeInfo[price].name });
        slotsFilled++;
      }
    }
  });


  while (slotsFilled < totalSlots) {
    distributedPrizes.push({ value: null, name: 'MAY MẮN LẦN SAU' });
    slotsFilled++;
  }


  for (let i = distributedPrizes.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [distributedPrizes[i], distributedPrizes[j]] = [distributedPrizes[j], distributedPrizes[i]];
  }

  return distributedPrizes.map((prize, index) => ({ ...prize, index }));
};


const updateWheelDOM = (wheelLayout) => {
  allWheelSegments = wheelLayout;

  wheelLayout.forEach(segment => {
    const labelSpan = $(`#label-${segment.index} span`);
    let newText, newStyle;

    const isEven = segment.index % 2 === 0;

    if (segment.value) { // Ô chứa giải thưởng
      newText = WHEEL_CONFIG.prizeInfo[segment.value].text;
      newStyle = isEven ? WHEEL_CONFIG.slotStyles.prize_even : WHEEL_CONFIG.slotStyles.prize_odd;
    } else { // Ô chứa "MAY MẮN LẦN SAU"
      newText = WHEEL_CONFIG.prizeInfo.default.text;
      newStyle = isEven ? WHEEL_CONFIG.slotStyles.mmls_even : WHEEL_CONFIG.slotStyles.mmls_odd;
    }

    labelSpan.text(newText);
    labelSpan.attr('style', newStyle);
    labelSpan.data('value', segment.value);
  });
};



const luckyWheelUI = {
  setLoading: (isLoading) => isLoading ? $('#loading').show() : $('#loading').hide(),
  resetForm: () => {
    $('#lucky-wheel-phone, #lucky-wheel-otp, #lucky-wheel-network').val('');
    $('#lucky-wheel-network').removeClass('has-value');
    luckyWheelApiToken = null;
    luckyWheelTransId = null;
    availablePrices = [];
    selectedPrice = null;

    const defaultAvailablePrizes = Object.keys(WHEEL_CONFIG.prizeInfo).filter(p => p !== 'default');
    const defaultLayout = distributePrizes(defaultAvailablePrizes);
    updateWheelDOM(defaultLayout);
  },
  switchToWheelView: () => {
    $('#lucky-wheel-content .lucky-wheel-form-body').addClass('view-hidden');
    const gameBody = $('#lucky-wheel-content .lucky-wheel-game-body');
    gameBody.css('display', 'flex');
    setTimeout(() => { gameBody.addClass('view-visible'); }, 10);
  }
};

const luckyWheelValidation = {
  validateForm: (fields) => {
    let messages = [];
    const phone = $('#lucky-wheel-phone').val();
    const network = $('#lucky-wheel-network').val();
    const otp = $('#lucky-wheel-otp').val();

    if (fields.phone) {
      if (!phone) messages.push("Số điện thoại là bắt buộc.");
      else if (!lib.validatePhoneNumber(phone)) messages.push("Số điện thoại không đúng định dạng.");
    }
    if (fields.network) {
      if (!network) messages.push("Chọn nhà mạng là bắt buộc.");
    }
    if (fields.otp) {
      if (!otp) messages.push("Mã OTP là bắt buộc.");
      else if (!/^\d{6}$/.test(otp)) messages.push("Mã OTP phải là 6 chữ số.");
    }
    return { valid: messages.length === 0, msg: messages.join('<br/>') };
  }
};

const luckyWheelApi = {
  verifyPhone: (phone, callbacks) => {
    const payload = { request_id: uuidv4(), contact_number: phone, national_id: "" };
    lib.post({ url: `${env.backEndApi}/api/mobile-cards/verify-phone`, data: JSON.stringify(payload), ...callbacks });
  },
  generateOtp: (phone, transId, callbacks) => {
    const payload = { TransId: transId, Data: { phone, idCard: "", channel: "LOAN3" } };
    lib.post({ url: `${env.backEndApi}/api/otp/gen-otp`, data: JSON.stringify(payload), ...callbacks });
  },
  verifyOtp: (phone, otp, transId, callbacks) => {
    const payload = { TransId: transId, Data: { phone, otp, channel: "LOAN3" } };
    lib.post({ url: `${env.backEndApi}/api/otp/verify-otp`, data: JSON.stringify(payload), ...callbacks });
  },
  getCard: (phone, brand, price, token, callbacks) => {
    const payload = { brand, phoneNumber: phone, price, token };
    lib.post({
      url: `${env.backEndApi}/api/mobile-cards/get-card`,
      data: JSON.stringify(payload),
      ...callbacks
    });
  },
  getPriceList: (brand, callbacks) => {
    const payload = { brand: brand.toUpperCase() };
    lib.post({ url: `${env.backEndApi}/api/mobile-cards/get-price`, data: JSON.stringify(payload), ...callbacks });
  }
};

$(document).ready(function () {
  if (document.getElementById("modalLuckyWheel")) {
    modalLuckyWheel = new bootstrap.Modal(document.getElementById("modalLuckyWheel"));
  }

  luckyWheelUI.resetForm();

  $('#lucky-wheel-network').on('change', function() {
    const selectedBrand = $(this).val();
    availablePrices = [];
    if (!selectedBrand) {
      luckyWheelUI.resetForm();
      return;
    }

    luckyWheelUI.setLoading(true);
    luckyWheelApi.getPriceList(selectedBrand, {
      complete: function(response) {
        luckyWheelUI.setLoading(false);
        const data = response.responseJSON;
        if (data && data.Data && Array.isArray(data.Data)) {
          availablePrices = data.Data;
          const newLayout = distributePrizes(availablePrices);
          updateWheelDOM(newLayout);
          if (availablePrices.length === 0) {
            showNotiDefault('info', 'Thông báo', 'Nhà mạng này hiện đã hết thẻ. Vui lòng chọn nhà mạng khác.');
          }
        } else {
          const newLayout = distributePrizes([]);
          updateWheelDOM(newLayout);
          showNotiDefault('info', 'Thông báo', 'Nhà mạng này hiện đã hết thẻ. Vui lòng chọn nhà mạng khác.');
        }
      },
      error: function() {
        luckyWheelUI.setLoading(false);
        const newLayout = distributePrizes([]);
        updateWheelDOM(newLayout);
        showNotiDefault('error', 'Lỗi', 'Không thể kiểm tra kho thẻ. Vui lòng thử lại.');
      }
    });
  });

  $('#btn-get-otp').on('click', () => {
    const validation = luckyWheelValidation.validateForm({ phone: true, network: true });
    if (!validation.valid) {
      return showNotiDefault('error', 'Thông tin chưa đầy đủ', validation.msg);
    }

    // luckyWheelUI.setLoading(true);
    const phone = $('#lucky-wheel-phone').val();
    luckyWheelApi.verifyPhone(phone, {
      complete: function(response) {
        const data = response.responseJSON;
        if (data.token) {
          luckyWheelApiToken = data.token;
          const transId = data.request_id || uuidv4();
          luckyWheelApi.generateOtp(phone, transId, {
            complete: function(otpResponse) {
              luckyWheelUI.setLoading(false);
              const otpData = otpResponse.responseJSON;
              if (otpData.data?.result?.status === true) {
                luckyWheelTransId = otpData.transId || transId;
                $('#lucky-wheel-otp').focus();
              } else {
                showNotiDefault('error', 'Lỗi', otpData.errorMessage || 'Không thể tạo mã OTP.');
              }
            },
            error: function(otpError) {
              luckyWheelUI.setLoading(false);
              showNotiDefault('error', 'Lỗi', 'Không thể tạo mã OTP, vui lòng thử lại.');
            }
          });
        } else {
          luckyWheelUI.setLoading(false);
          showNotiDefault('error', 'Lỗi', data.rslt_msg || 'Xác thực không thành công.');
        }
      },
      error: function(error) {
        luckyWheelUI.setLoading(false);
        const errorMsg = error.responseJSON?.rslt_msg || 'Số điện thoại của Quý khách không đủ điều kiện tham gia.';
        showNotiDefault('error', 'Thông báo', errorMsg);
      }
    });
  });

  $('#btn-confirm-otp').on('click', () => {
    const validation = luckyWheelValidation.validateForm({ otp: true });
    if (!validation.valid) return showNotiDefault('error', 'OTP không hợp lệ', validation.msg);

    // luckyWheelUI.setLoading(true);
    const phone = $('#lucky-wheel-phone').val();
    const otp = $('#lucky-wheel-otp').val();

    luckyWheelApi.verifyOtp(phone, otp, luckyWheelTransId, {
      complete: function(response) {
        luckyWheelUI.setLoading(false);
        const data = response.responseJSON;
        if (data.data?.result?.authentication === 'ACCEPT') {
          showNotiDefault('success', 'Thành công', 'Xác thực thành công! Vui lòng bấm "Gửi thông tin" để quay thưởng.');
        } else {
          showNotiDefault('error', 'Xác thực thất bại', data.errorMessage || 'Mã OTP không chính xác.');
        }
      },
      error: function() {
        luckyWheelUI.setLoading(false);
        showNotiDefault('error', 'Xác thực thất bại', 'Có lỗi xảy ra, vui lòng thử lại.');
      }
    });
  });

  $('#btn-submit-lucky-wheel').on('click', () => {
    if (!luckyWheelApiToken) {
      showNotiDefault('error', 'Lỗi', 'Chưa hoàn tất xác thực.');
      return;
    }
    luckyWheelUI.switchToWheelView();
  });


  $('#btn-spin-wheel').on('click', function() {
    const wheelImage = document.getElementById('wheel-main-image');
    const resultPopup = document.getElementById('result-popup');
    const resultPopupCloseBtn = resultPopup.querySelector('.result-popup-close-btn');
    const luckyWheelModalInstance = bootstrap.Modal.getInstance(document.getElementById('modalLuckyWheel')) || new bootstrap.Modal(document.getElementById('modalLuckyWheel'));
    let isSpinning = $(this).data('isSpinning') || false;

    function updateAndShowPopup(prizeName, cardSerial = null) {
      const resultTitle = resultPopup.querySelector('.result-title');
      const resultSubtext = resultPopup.querySelector('.result-subtext');
      const resultAmount = resultPopup.querySelector('.result-amount');
      const resultCode = resultPopup.querySelector('.result-code');
      const resultNote = resultPopup.querySelector('.result-note');
      const shareLinks = resultPopup.querySelector('.result-share-links');
      const partyPopper = '<img src="./ladi/Party-Popper.png" alt="party popper" class="party-popper-icon">';

      if (prizeName === "MAY MẮN LẦN SAU") {
        resultTitle.innerHTML = "CHÚC BẠN MAY MẮN LẦN SAU!";
        resultSubtext.textContent = "Cảm ơn bạn đã tham gia chương trình của LOTTE Finance.";
        resultAmount.style.display = 'none';
        resultCode.style.display = 'none';
        resultNote.style.display = 'none';
        shareLinks.style.display = 'none';
      } else {
        const formattedAmount = parseInt(prizeName.replace('K', '')) + ',000 VND';
        resultTitle.innerHTML = `XIN CHÚC MỪNG! ${partyPopper}`;
        resultSubtext.textContent = "Bạn đã nhận được một thẻ điện thoại";
        resultAmount.textContent = formattedAmount;
        resultCode.textContent = `Mã thẻ: ${cardSerial}`;
        resultAmount.style.display = 'block';
        resultCode.style.display = 'block';
        resultNote.style.display = 'block';
        shareLinks.style.display = 'flex';
      }
      resultPopup.classList.add('visible');
    }

    const spinTheWheel = (prizeToLandOn, onSpinEndCallback) => {
      const wheelImage = document.getElementById('wheel-main-image');
      const labelContainer = document.getElementById('label-container');

      const totalSegments = 10;
      const segmentAngle = 360 / totalSegments;
      const initialWheelOffset = 109;
      const prizeTrueAngle = initialWheelOffset + (prizeToLandOn.index * segmentAngle);
      const arrowAngle = 270;

      const randomSpins = (Math.floor(Math.random() * 4) + 5) * 360;
      const angleJitter = (Math.random() - 0.5) * (segmentAngle * 0.8);
      const totalRotation = randomSpins + (arrowAngle - prizeTrueAngle) + angleJitter;

      wheelImage.dataset.rotation = totalRotation;
      labelContainer.dataset.rotation = totalRotation;

      const transitionStyle = 'transform 5s cubic-bezier(0.25, 1, 0.5, 1)';
      const transformStyle = `rotate(${totalRotation}deg)`;

      setTimeout(() => {
        wheelImage.style.transform = 'rotate(0deg)';
        labelContainer.style.transform = 'rotate(0deg)';

        const totalSegments = 10;
        const segmentAngle = 360 / totalSegments;
        const winningSegmentIndex = prizeToLandOn.index;
        const randomSpins = Math.floor(Math.random() * 4) + 5;
        const prizeAngle = winningSegmentIndex * segmentAngle;
        const arrowOffset = -90;
        const middleOfSegmentOffset = segmentAngle / 2;
        const angleJitter = (Math.random() - 0.5) * (segmentAngle * 0.8);
        const totalRotation = (randomSpins * 360) - prizeAngle - middleOfSegmentOffset + arrowOffset + angleJitter;
        setTimeout(() => {
          const transitionStyle = 'transform 5s cubic-bezier(0.25, 1, 0.5, 1)';
          const transformStyle = `rotate(${totalRotation}deg)`;

          wheelImage.style.transition = transitionStyle;
          wheelImage.style.transform = transformStyle;

          labelContainer.style.transition = transitionStyle;
          labelContainer.style.transform = transformStyle;
        }, 20);

      }, 10);

      wheelImage.addEventListener('transitionend', () => {
        $('#btn-spin-wheel').data('isSpinning', false);
        luckyWheelUI.setLoading(false);

        if (onSpinEndCallback) {
          onSpinEndCallback();
        }
      }, { once: true });
    };

    if (isSpinning) return;
    if (!luckyWheelApiToken) {
      showNotiDefault('error', 'Lỗi', 'Không có token xác thực. Vui lòng thử lại từ đầu.');
      return;
    }

    $(this).data('isSpinning', true);
    // luckyWheelUI.setLoading(true);

    const prizeRatio = WHEEL_CONFIG.prizeRatio;
    const virtualWheel = [];
    allWheelSegments.forEach(segment => {
      const ratioKey = segment.value ? segment.value : 'MMLSau';
      const tickets = (prizeRatio[ratioKey] || 0) * 10;
      for(let i = 0; i < tickets; i++) {
        virtualWheel.push(segment);
      }
    });

    if (virtualWheel.length === 0) {
      const losingSegments = allWheelSegments.filter(s => s.value === null);
      if (losingSegments.length > 0) {
        losingSegments.forEach(s => virtualWheel.push(s));
      } else {
        luckyWheelUI.setLoading(false);
        $(this).data('isSpinning', false);
        showNotiDefault('error', 'Lỗi', 'Không có giải thưởng nào để quay.');
        return;
      }
    }

    const randomVirtualIndex = Math.floor(Math.random() * virtualWheel.length);
    const decidedPrize = virtualWheel[randomVirtualIndex];

    const matchingRealSegments = allWheelSegments.filter(s => s.value === decidedPrize.value);
    const winningSegment = matchingRealSegments[Math.floor(Math.random() * matchingRealSegments.length)];

    console.log("Giải thưởng đã quyết định:", decidedPrize.name);
    console.log("Sẽ quay vào ô có index:", winningSegment.index);

    if (winningSegment.value) {
      const phone = $('#lucky-wheel-phone').val();
      const network = $('#lucky-wheel-network').val();

      luckyWheelApi.getCard(phone, network, winningSegment.value, luckyWheelApiToken, {
        complete: function(response) {
          const data = response.responseJSON;
          if (data && data.cardNumber) {
            spinTheWheel(winningSegment, () => {
              updateAndShowPopup(winningSegment.name, data.cardNumber);
            });
          } else {
            luckyWheelUI.setLoading(false);
            $('#btn-spin-wheel').data('isSpinning', false);
            showNotiDefault('error', 'Lỗi', data.message || 'Không nhận được thẻ cào từ hệ thống. Vui lòng thử lại.');
          }
          luckyWheelApiToken = null;
        },
        error: function(error) {
          luckyWheelUI.setLoading(false);
          $('#btn-spin-wheel').data('isSpinning', false);
          showNotiDefault('error', 'Lỗi', error.responseJSON?.message || 'Lỗi khi đổi thưởng.');
          luckyWheelApiToken = null;
        }
      });
    } else {
      spinTheWheel(winningSegment, () => {
        updateAndShowPopup(winningSegment.name);
      });
    }

    if (!resultPopup.dataset.listenerAttached) {
      const closeAllPopups = () => {
        luckyWheelModalInstance.hide();
        resultPopup.classList.remove('visible');
      };
      resultPopupCloseBtn.addEventListener('click', closeAllPopups);
      resultPopup.addEventListener('click', function(event) {
        if (event.target === this) {
          closeAllPopups();
        }
      });
      resultPopup.dataset.listenerAttached = 'true';
    }
  });
});