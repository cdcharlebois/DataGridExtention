//----------------------------------------------------------------------
// Section for dynamic showing paging and Empty table
//----------------------------------------------------------------------
define([
    "dojo/_base/declare",
    "mxui/widget/_WidgetBase"
], function(declare, _WidgetBase) {
    //"use strict";

    return declare(null, {
        inputargs: {
            hideUnusedPaging: false,
            firstLastMinPages: 3
        },

        checkConfigPagingButtons: function() {

        },

        postCreatePagingButtons: function() {
            this.checkConfigPagingButtons();

            if (this.hideUnusedPaging) {
                this.connect(this.grid, "fillGrid", this.updatePaging);
            }
            //this.loaded();
        },

        updatePaging: function() {
            if (this.grid !== null) {
                if (this.hideUnusedPaging === true) {
                    var ds = this.grid._dataSource;
                    var atBegin = ds.atBeginning();
                    var atEnd = ds.atEnd();
                    if (atBegin === true && atEnd === true)
                        dojo.style(this.grid.pagingBarNode, "display", "none");
                    else
                        dojo.style(this.grid.pagingBarNode, "display", "block");
                }
                if (this.hideUnusedPaging && this.grid.pagingBarNode.children.length > 0) {
                    var countPages = Math.ceil(this.grid._dataSource.getSetSize() / this.grid._dataSource._pageSize);
					var lastButtonIndex = this.grid.pagingBarNode.children.length - 1;
					if (countPages <= this.firstLastMinPages) {
                        dojo.style(this.grid.pagingBarNode.children[0], "display", "none");
						dojo.style(this.grid.pagingBarNode.children[lastButtonIndex], "display", "none");

                    } else {
                        dojo.style(this.grid.pagingBarNode.children[0], "display", "inline-block");
                        dojo.style(this.grid.pagingBarNode.children[lastButtonIndex], "display", "inline-block");
                    }
                }
            }
        }
    });
});

//@ sourceURL=widgets/DataGridExtension/widget/PagingButtons.js
