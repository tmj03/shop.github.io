



function validator(options) {
    function getParent(element, selector) {
        while (element.parentElement) {
            if (element.parentElement.matches(selector)) {
                return element.parentElement;
            }
            element = element.parentElement;
        }
    }

    var selectorRules = {};

    //thực hiện validate
    function validate(inputElement, rule) {
        var errorElement = getParent(inputElement, options.formGroupSelector).querySelector(options.errorSelector);
        var errorMessage;
        
        //lấy ra các rules của selector
        var rules = selectorRules[rule.selector];

        //lặp qua từng  và kiểm tra
        //nếu có lỗi thì dừng kiểm tra
        for (var i = 0; i < rules.length; ++i) {
            switch (inputElement.type){
                case 'radio':
                case 'checkbox':
                    formElement.querySelector(rule.selector + ':checked')
                    break;
                default:
                    errorMessage = rules[i](inputElement.value);
            }

            
            if(errorMessage) break;
        }
                    
        if (errorMessage) {
            errorElement.innerText = errorMessage;
           getParent(inputElement, options.formGroupSelector).classList.add('invalid');
        } else {
            errorElement.innerText = '';
           getParent(inputElement, options.formGroupSelector).classList.remove('invalid');

        }

        return !errorMessage;


    }
    //lấy element của form
    var formElement = document.querySelector(options.form);
    if (formElement) {

        //lấy element của form cần validata
        var formElement = document.querySelector(options.form);
        if(formElement) {
            //khi submit form
            formElement.onsubmit = function (e) {
                e.preventDefault();

                var isFormValid = true;

                //lặp qua từng rule và vaidate
                options.rules.forEach(function (rule){
                    var inputElement = formElement.querySelector(rule.selector);
                    var isValid = validate(inputElement, rule);
                    if (!isValid) {
                        isFormValid = false;

                    }
                });
                
                if (isFormValid) {
                    //trường hợp submit với js
                    if (typeof options.onSubmit ==='function') {
                        var enableInputs = formElement.querySelectorAll('[name]');
                        var formValues = Array.from(enableInputs).reduce(function(values, input) {
                            switch(input.type) {
                                case 'radio':
                                    values[input.name] = formElement.querySelector('input[name="' + input.name + '"]:checked').value;
                                    break;
                                case 'checkbox':
                                    if (!input.matches(':checked')) {
                                        values[input.name] = '';
                                        return values;
                                    }
                                    if (!Array.isArray(values[input.name])) {
                                        values[input.name] = [];
                                    }

                                    values[input.name].push(input.value);

                                    break;
                                case 'file':
                                    values[input.name] = input.files;
                                    break;
                                default:
                                    values[input.name] = input.value;
                            }        
                            return values;
                        },{});
                        options.onSubmit(formValues);
                    } 
                    // trường hợp submit với htnl
                    else {
                        formElement.submit();
                    }
                }

            }
        }
        //lặp qua mỗi rule và sử lý
        options.rules.forEach(function (rule){

            //lưu lại các rule cho mỗi input
            if (Array.isArray(selectorRules[rule.selector])) {
                selectorRules[rule.selector].push(rule.test);
            } else {
                selectorRules[rule.selector] = [rule.test];

            }


            
            var inputElements = formElement.querySelectorAll(rule.selector);

            Array.from(inputElements).forEach(function(inputElement){
                //xử lý trường hợp blur khỏi iput
                inputElement.onblur = function() {
                    validate(inputElement, rule);
                }

                //xử lý mỗi khi người dùng nhập
                inputElement.oninput = function() {
                    var errorElement =getParent(inputElement, options.formGroupSelector).querySelector(options.errorSelector);

                    errorElement.innerText = '';
                   getParent(inputElement, options.formGroupSelector).classList.remove('invalid');
                }
            });
        });
    }
}

//định nghĩa rules
validator.isRequired = function(selector, message) {
    return {
        selector: selector,
        test: function (value) {
            return value ? undefined : message || 'Vui lòng nhập trường này'
        }
    };
}

validator.isEmail = function(selector, message) {
    return {
        selector: selector,
        test: function (value) {
            var regex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
            return regex.test(value) ? undefined : message || 'Trường này phải là email'
        }
    };
}

validator.minLength = function(selector, min, message) {
    return {
        selector: selector,
        test: function (value) {
            return value.length >= min ? undefined : message ||`Vui lòng nhập tối thiểu ${min} kí tự`
        }
    };
}

validator.isConfirmed = function(selector, getConfirmValue, message) {
    return {
        selector : selector,
        test: function(value) {
            return  value === getConfirmValue() ? undefined : message || 'giá trị nhập vào không chính xác'
        }
    }
}