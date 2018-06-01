Vue.prototype.validator  = function (type) {
    switch(type){
        case 'number':
            return /^(\-|\+)?\d+(\.\d+)?$/;///^[0-9]*$/;
        case 'integer':
            return /^\d*$/;
        case 'float':
            return /^[+-]?((0|([1-9]\d*))\.\d+)?$/;
        case 'mobile':
            return /^1([358][0-9]|4[579]|66|7[0135678]|9[89])[0-9]{8}$/;
        case 'phone':
            return /^((0\d{2,3})-)(\d{7,8})(-(\d{3,}))?$/;
    }
}