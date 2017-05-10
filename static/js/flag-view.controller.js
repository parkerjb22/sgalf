(function() {

    var myApp = angular.module('myApp')

    myApp.controller("FlagViewCtrl", FlagViewCtrl)

    FlagViewCtrl.$inject = ['FlagService']

    function FlagViewCtrl(FlagService) {
        var vm = this
        activate();

        function activate() {
            vm.flags = {}
            vm.rawFlags = {}
            vm.inputText = ""
            vm.flagText = ""

            FlagService.getFlags().then(function(flags) {
                vm.rawFlags = flags
                var parsedData = flags.toJSON()
                var tmpArray = Object.keys(parsedData).map(function(k) { return [k, parsedData[k]] });
                var chunkData = chunk(tmpArray, 15)
                vm.flags = transpose(chunkData)
            })
        }

        vm.translate = (function() {
            var phrase = vm.inputText.toUpperCase()
            vm.flagText = ""
            for (var i=0; i<phrase.length; i+=2) {
                curr = phrase.substring(i, i + 2)
                if (vm.rawFlags[curr] != undefined) {
                    vm.flagText += vm.rawFlags[curr]
                }
                else {
                    vm.flagText += curr
                }
            }
        })

        vm.copy = (function copy() {
            var body = angular.element(document.body);
            var textarea = angular.element('<textarea/>');
            textarea.css({
                position: 'fixed',
                opacity: '0'
            });

            textarea.val(vm.flagText);
            body.append(textarea);
            textarea[0].select();

            try {
                var successful = document.execCommand('copy');
                if (!successful) throw successful;
            } catch (err) {
                console.log("failed to copy", toCopy);
            }
            textarea.remove();
        })
    }

    function chunk(arr, size) {
        var newArr = [];
        for (var i=0; i<arr.length; i+=size) {
            newArr.push(arr.slice(i, i+size));
        }
        return newArr;
    }

    function transpose(a) {

      var w = a.length || 0;
      var h = a[0] instanceof Array ? a[0].length : 0;

      if(h === 0 || w === 0) { return []; }

      var i, j, t = [];

      for(i=0; i<h; i++) {
        t[i] = [];
        for(j=0; j<w; j++) {
          t[i][j] = a[j][i];
        }
      }

      return t;
    }

})();
