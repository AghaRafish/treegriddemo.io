import { Component, OnInit, ViewChild, ViewEncapsulation } from "@angular/core";
import { sampleData } from "./datasource";
import {
    TreeGridComponent,
    PageSettingsModel,
    SortSettingsModel,
    EditSettingsModel,
    SelectionSettingsModel,
    FilterSettingsModel,
    Column as TreeGridColumn
    

} from "@syncfusion/ej2-angular-treegrid";
import { treemodal } from "./tree-model";
import { ChangeEventArgs } from '@syncfusion/ej2-dropdowns';
import { ActionEventArgs, freezeDirection, Column , SortEventArgs, ColumnModel } from '@syncfusion/ej2-grids';
import { DropDownListComponent } from "@syncfusion/ej2-angular-dropdowns";
import { ButtonComponent, CheckBoxComponent } from "@syncfusion/ej2-angular-buttons";
import { ButtonPropsModel, DialogComponent } from "@syncfusion/ej2-angular-popups";
import { BeforeOpenCloseEventArgs, ColorPickerEventArgs } from "@syncfusion/ej2-inputs";
import { MenuEventArgs } from "@syncfusion/ej2-navigations";
import { getValue, isNullOrUndefined } from "@syncfusion/ej2-base";
import { NumericTextBoxComponent, ColorPickerComponent } from "@syncfusion/ej2-angular-inputs";

@Component({
    selector: "app-root",
    templateUrl: "./app.component.html",
    styleUrls: ["./app.component.css"],
    encapsulation: ViewEncapsulation.None
})
export class AppComponent implements OnInit {
    public data: Object[];
    name: string;
    public d1data: Object;
    public d3data: Object;
    public d4Allignment: Object;
    public d5ColumnDataTypes: Object;
    public ddlfields: Object;
    public d2data: Object;
    public fields: Object;

    public content: string = 'Atleast one Column should be in movable';
    public header: string = 'Frozen';
    public showCloseIcon: boolean = false;
    public target: string = '.control-section';
    public width: string = '300px';
    public minWidthofSelectedColumn: number = 120;

    public selectedColumnHeaderDataType: Object;
    public selectedColumnHeaderFont: Object;
    public treeGridColumns: Column[];
    public selectedColumn: TreeGridColumn;
    public selectedColumnHeader: string = 'taskid';
    public defaultDatatypeSelected: string = 'defaultedit';
    public defaultAlignment: string = 'center';
    public defaultTextWrap: boolean = false;
    public defaultcellBgColor: string = '#fff';
    public defaultcellFontSize: number = 12;
    public defaultcellColor: string = '#808080';

    @ViewChild('treegrid', { static: false }) public treegrid: TreeGridComponent;
    @ViewChild('dropdown1', { static: false }) public dropdown1: DropDownListComponent;
    @ViewChild('dropdown2', { static: false }) public dropdown2: DropDownListComponent;
    @ViewChild('dropdown3', { static: false }) public dropdown3: DropDownListComponent;
    @ViewChild('textWrapCheckbox', { static: false }) public textWrapCheckbox: CheckBoxComponent;
    @ViewChild('minimumWidthInput', { static: false }) public minimumWidthInput: NumericTextBoxComponent;
    @ViewChild('fontsize', { static: false }) public fontsize: NumericTextBoxComponent;
    @ViewChild('fontColor', { static: false }) public fontColor: ColorPickerComponent;
    @ViewChild('BgColor', { static: false }) public BgColor: ColorPickerComponent;

    @ViewChild('button1', { static: false }) public button1: ButtonComponent;
    @ViewChild('button2', { static: false }) public button2: ButtonComponent;
    @ViewChild('columndropdown', { static: false }) public columnDropDown: DropDownListComponent;
    @ViewChild('directiondropdown', { static: false }) public directionDropDown: DropDownListComponent;
    @ViewChild('alertDialog', { static: false }) public alertDialog: DialogComponent;
    @ViewChild('taskID', { static: false }) public taskID: CheckBoxComponent;
    @ViewChild('taskName', { static: false }) public taskName: CheckBoxComponent;
    @ViewChild('startDate', { static: false }) public startDate: CheckBoxComponent;
    @ViewChild('duration', { static: false }) public duration: CheckBoxComponent;
    timeoutHandler: number;
    
    public lstTreemodal: treemodal[];
    public objTreemodal: treemodal;
    public sortSettings: SortSettingsModel;
    public pageSettings: PageSettingsModel;
    public editSettings: EditSettingsModel;
    public filterSettings: FilterSettingsModel
    public selectionOptions: SelectionSettingsModel;
    public frozen: string = "2";
    public toolbar: string[];
    public columnsList = [{
        field: "taskID",
        headerText: "Task ID",
        textAlign: "Right",
        format: "",
        width: "90",
        editTypes: "numericedit",
        freeze: "left",
        filter: "taskid", minWidth: 120, maxWidth: 300
    },
    {
        field: "taskName",
        headerText: "Task Name",
        textAlign: "Left",
        format: "",
        width: "180",
        editTypes: "",
        freeze: "",
        filter: "taskname", minWidth: 120, maxWidth: 300
    },
    {
        field: "startDate",
        headerText: "Start Date",
        textAlign: "Right",
        format: "yMd",
        width: "90",
        editTypes: "datepickeredit",
        freeze: "",
        filter: "startDate", minWidth: 120, maxWidth: 300
    }
        , {
        field: "duration",
        headerText: "Duration",
        textAlign: "Right",
        format: "",
        width: "80",
        editTypes: "numericedit",
        freeze: "",
        filter: "duration", minWidth: 120, maxWidth: 300
    }];
    public refresh: boolean = true;
    public columnData: Object[] = [
        { id: 'taskID', name: 'Task ID' },
        { id: 'taskName', name: 'TaskName' },
        { id: 'startDate', name: 'Start Date' },
        { id: 'duration', name: 'Duration' }
    ];
    public directionData: Object[] = [
        { id: 'Left', name: 'Left' },
        { id: 'Right', name: 'Right' },
        { id: 'Center', name: 'Center' }
    ];
    public animationSettings: object = { effect: 'None' };
    public visible: boolean = false;
    public contextMenuItems: object;
    public ShowHideColumns: boolean = false;
    public FreezeColumns: boolean = false;
    public FilterColumns: boolean = false;
    public MultiSortColumns: boolean = false;
    public StyleColumns: boolean = false;
    public NewColumns: boolean = false;
    public elementSelectedForStyle: Column;
    public customAttributes: Object;
    ngOnInit(): void {
        //this.fontColor.value = "black";
        //this.BgColor.value = "white";
        debugger;
        //this.customAttributes = { style: "background-color:'" + this.defaultcellBgColor+ "',font-size:'" + this.defaultcellFontSize + "',color:'"+ this.defaultcellColor+"'" };
        this.filterSettings = { type: 'FilterBar', hierarchyMode: 'Parent', mode: 'Immediate' };
        this.selectionOptions = { persistSelection: true };
        this.toolbar = ['']
        this.lstTreemodal = this.columnsList;
        this.data = sampleData;
        this.sortSettings = {
            columns: [{ field: 'taskID', direction: 'Ascending' },
            { field: 'taskName', direction: 'Ascending' }]
        }
        this.pageSettings = { pageSize: 10, pageCount: 2, pageSizes: true }
        this.editSettings = { allowEditing: true, allowAdding: true, allowDeleting: true, mode: 'Dialog' };
        this.selectionOptions = { type: "Multiple" }
        this.ddlfields = { text: 'name', value: 'id' };
        this.d1data = [
            { id: 'taskID', name: 'Task ID' },
            { id: 'taskName', name: 'Task Name' },
            { id: 'startDate', name: 'Start Date' },
            { id: 'duration', name: 'Duration' }
        ],
            this.d2data = [
                { id: '0', name: '1' },
                { id: '1', name: '2' },
                { id: '2', name: '3' },
                { id: '3', name: '4' }
            ],
            this.fields = { text: 'name', value: 'id' }
        this.d3data = [{ id: 'taskID', name: 'Task ID' },
        { id: 'taskName', name: 'Task Name' },
        { id: 'startDate', name: 'Start Date' },
        { id: 'duration', name: 'Duration' }];
        this.d4Allignment = [
            { id: 'Center', name: 'Center' },
            { id: 'Right', name: 'Right' },
            { id: 'Left', name: 'Left' },
            { id: 'Justify', name: 'Justify' },
        ],
            this.d5ColumnDataTypes = [
                { id: 'numericedit', name: 'Number' },
                { id: 'defaultedit', name: 'String' },
                { id: 'dropdownedit', name: 'Dropdown' },
                { id: 'booleanedit', name: 'Boolean' },
                { id: 'datepickeredit', name: 'Datepicker' },
                { id: 'datetimepickeredit', name: 'Datetime picker' },
            ]
        this.contextMenuItems = [
            // { text: 'Collapse All', target: '.e-headercontent', id: 'collapseall' },
            // { text: 'Expand All', target: '.e-headercontent', id: 'expandall' },
            { text: 'Style', target: '.e-headercontent', id: 'style' },
            { text: 'New', target: '.e-headercontent', id: 'new' },
            { text: 'Show', target: '.e-headercontent', id: 'show' },
            { text: 'Freeze', target: '.e-headercontent', id: 'freeze' },
            { text: 'Filter', target: '.e-headercontent', id: 'filter' },
            { text: 'Multi-Sort', target: '.e-headercontent', id: 'multisort' },
            // {text: 'Collapse the Row', target: '.e-content', id: 'collapserow'},
            // {text: 'Expand the Row', target: '.e-content', id: 'expandrow'},
            { text: 'New', target: '.e-content', id: 'newrow' },
            { text: 'Multi-Select', target: '.e-content', id: 'multiselectrow' },
            { text: 'Paste Sibling', target: '.e-content', id: 'pastesibling' },
            { text: 'Paste Child', target: '.e-content', id: 'pastechild' }

        ]
    }
    public change(e: ChangeEventArgs): void {
        let columnName: string = <string>this.dropdown1.value;
        let toColumnIndex: number = <number>e.value;
        this.treegrid.reorderColumns(columnName, (<Column>this.treegrid.columns[toColumnIndex]).field);
    }
    public onChange(e: ChangeEventArgs): void {
        let columnName: string = <string>e.value;
        let index: number = this.treegrid.getColumnIndexByField(columnName);
        this.dropdown2.value = index.toString();
    }
    columnHide(e: ChangeEventArgs): void {
        let columnName: string = <string>e.value;
        let column = this.treegrid.getColumnByField(columnName);
        if (column.visible === undefined || column.visible) {
            this.button2.disabled = true;
            this.button1.disabled = false;
        } else {
            this.button1.disabled = true;
            this.button2.disabled = false;
        }
    }
    ShowHide(e: ChangeEventArgs): void {
        debugger
        let columnName: string = <string>e.value;
        let column = this.treegrid.getColumnByField(columnName);
        if (column.visible === undefined || column.visible) {
            this.button2.disabled = true;
            this.button1.disabled = false;
        } else {
            this.button1.disabled = true;
            this.button2.disabled = false;
        }
    }
    public actionComplete(args: ActionEventArgs): void {
        if (args.requestType === 'reorder') {
            let columnName: string = <string>this.dropdown1.value;
            let index: number = this.treegrid.getColumnIndexByField(columnName);
            this.dropdown2.value = index.toString();
        }
        if (args.requestType === 'sorting') {
            for (let columns of this.treegrid.getColumns()) {
                for (let sortcolumns of this.treegrid.sortSettings.columns) {
                    if (sortcolumns.field === columns.field) {
                        this.check(sortcolumns.field, true); break;
                    } else {
                        this.check(columns.field, false);
                    }
                }
            }
        }
    }
    public clicked(e: MouseEvent): void {
        debugger
        let columnName: string = <string>this.dropdown3.value;
        let column = this.treegrid.getColumnByField(columnName);
        let hiddenColumns: HTMLTextAreaElement = document.getElementById('hiddencolumns') as HTMLTextAreaElement;
        this.treegrid.grid.showColumns(column.headerText, 'headerText');
        this.button2.disabled = true;
        this.button1.disabled = false;
        hiddenColumns.value = hiddenColumns.value.replace(column.headerText + '\n', '');
    }
    onClicked(): void {
        debugger
        let columnName: string = <string>this.dropdown3.value;
        let column = this.treegrid.getColumnByField(columnName);
        let hiddenColumns: HTMLTextAreaElement = document.getElementById('hiddencolumns') as HTMLTextAreaElement;

        if (this.treegrid.getHeaderTable().querySelectorAll('th.e-hide').length === 3) {
            alert('Atleast one Column should be visible');
        } else {
            this.treegrid.grid.hideColumns(column.headerText, 'headerText');
            this.button1.disabled = true;
            this.button2.disabled = false;
            hiddenColumns.value = hiddenColumns.value + column.headerText + '\n';
        }
    };
    public columnChange(e: ChangeEventArgs): void {
        let columnName: string = e.value as string;
        let column: Column = this.treegrid.grid.getColumnByField(columnName);
        let value: string = column.freeze === undefined ? 'Center' : column.freeze;
        this.refresh = this.directionDropDown.value === value;
        this.directionDropDown.value = value;
    }

    public directionChange(e: ChangeEventArgs): void {
        if (this.refresh) {
            let columnName: string = this.columnDropDown.value as string;
            let mvblColumns: Column[] = this.treegrid.grid.getMovableColumns();
            if (
                mvblColumns.length === 1 &&
                columnName === mvblColumns[0].field &&
                e.value !== mvblColumns[0].freeze
            ) {
                this.alertDialog.show();
                this.refresh = false;
                this.directionDropDown.value = 'Center';
                this.directionDropDown.refresh();
            } else {
                this.treegrid.grid.getColumnByField(columnName).freeze =
                    e.value === 'Center' ? undefined : (e.value as freezeDirection);
                this.treegrid.refreshColumns();
            }
        }
        this.refresh = true;
    }

    public alertDialogBtnClick = (): void => {
        this.alertDialog.hide();
    };

    public dlgButtons: ButtonPropsModel[] = [
        {
            click: this.alertDialogBtnClick.bind(this),
            buttonModel: { content: 'OK', isPrimary: true }
        }
    ];

    public onClick1(e: MouseEvent): void {
        if (this.taskID.checked) {
            this.treegrid.sortByColumn('taskID', 'Ascending', true);
        } else {
            this.treegrid.grid.removeSortColumn('taskID');
        }
        this.treegrid.refreshHeader();

    }
    public onClick2(e: MouseEvent): void {
        if (this.taskName.checked) {
            this.treegrid.sortByColumn('taskName', 'Ascending', true);
        } else {
            this.treegrid.grid.removeSortColumn('taskName');
        }
        this.treegrid.refreshHeader();
    }
    public onClick3(e: MouseEvent): void {
        if (this.startDate.checked) {
            this.treegrid.sortByColumn('startDate', 'Ascending', true);
        } else {
            this.treegrid.grid.removeSortColumn('startDate');
        }
        this.treegrid.refreshHeader();
    }
    public onClick4(e: MouseEvent): void {
        if (this.duration.checked) {
            this.treegrid.sortByColumn('duration', 'Ascending', true);
        } else {
            this.treegrid.grid.removeSortColumn('duration');
        }
        this.treegrid.refreshHeader();
    }
    public check(field: string, state: boolean): void {
        debugger
        switch (field) {
            case 'taskID':
                this.taskID.checked = state; break;
            case 'taskName':
                this.taskName.checked = state; break;
            case 'startDate':
                this.startDate.checked = state; break;
            case 'duration':
                this.duration.checked = state; break;
        }
    }

    contextMenuClick(args?: ContextMenuArgs): void {
        debugger
        if (args.item.id === 'style') {
            if (this.StyleColumns) {
                this.StyleColumns = false;
                document.getElementById('treeGridDiv').setAttribute('class', 'col-md-12')
                this.treeGridColumns = null;

            }
            else {
                this.StyleColumns = true;
                document.getElementById('treeGridDiv').setAttribute('class', 'col-md-8')
                /* this.treeGridColumns = <Column[]>this.treegrid.columns;*/
                this.selectedColumn = args.column;
                this.selectedColumnHeader = args.column.field;
                this.defaultDatatypeSelected = args.column.editType == "" ? "defaultedit" : args.column.editType.toString();
                this.defaultAlignment = args.column.textAlign.toString() == "" ? 'Center' : args.column.textAlign.toString();
                

                /*let currentColumn=this.treeGridColumns.filter(x => x.filter == .filter)*/
                /* this.treeGridColumns.filter(x=>x.filter==args.item.)*/

                //let result = this.treegrid.columns.filter(x => x.field == 'abc');
                /* this.minWidthofSelectedColumn = this.columnData.filter(x=>x)*/


            }
            this.ShowHideColumns = false;
            this.FreezeColumns = false;
            this.FilterColumns = false;
            this.MultiSortColumns = false;
            this.NewColumns = false;

        }
        else if (args.item.id === 'new') {
            if (this.NewColumns) {
                this.NewColumns = false;
            }
            else {
                this.NewColumns = true;
            }
            this.ShowHideColumns = false;
            this.FreezeColumns = false;
            this.FilterColumns = false;
            this.MultiSortColumns = false;
            this.StyleColumns = false;
        }
        else if (args.item.id === 'show') {
            if (this.ShowHideColumns) {
                this.toolbar = ['']
                this.ShowHideColumns = false;
            }
            else {
                this.toolbar = ['ColumnChooser']
                this.ShowHideColumns = true;
            }
            this.FreezeColumns = false;
            this.FilterColumns = false;
            this.MultiSortColumns = false;
            this.StyleColumns = false;
            this.NewColumns = false;
        }
        else if (args.item.id === 'freeze') {
            this.FreezeColumns = true;
            this.ShowHideColumns = false;
            this.FilterColumns = false;
            this.MultiSortColumns = false;
            this.StyleColumns = false;
            this.NewColumns = false;
        }
        else if (args.item.id === 'multisort') {
            if (this.MultiSortColumns) {
                this.MultiSortColumns = false;
            }
            else {
                this.MultiSortColumns = true;
            }
            this.ShowHideColumns = false;
            this.FreezeColumns = false;
            this.FilterColumns = false;
            this.StyleColumns = false;
            this.NewColumns = false;
        }
        else if (args.item.id === 'filter') {
            if (this.FilterColumns) {
                this.FilterColumns = false;
            }
            else {
                this.FilterColumns = true;
            }
            this.ShowHideColumns = false;
            this.FreezeColumns = false;
            this.MultiSortColumns = false;
            this.StyleColumns = false;
            this.NewColumns = false;
        }
    }
    contextMenuOpen(arg?: BeforeOpenCloseEventArgs): void {
        debugger
        let elem: Element = arg.event.target as Element;
        let row: Element = elem.closest('.e-row');
        let uid: string = row && row.getAttribute('data-uid');
        let items: Array<HTMLElement> = [].slice.call(document.querySelectorAll('.e-menu-item'));
        for (let i: number = 0; i < items.length; i++) {
            items[i].setAttribute('style', 'display: none;');
        }
        if (elem.closest('.e-row')) {
            if (isNullOrUndefined(uid) ||
                isNullOrUndefined(getValue('hasChildRecords', this.treegrid.grid.getRowObjectFromUID(uid).data))) {
                arg.cancel = true;
            } else {
                let flag: boolean = getValue('expanded', this.treegrid.grid.getRowObjectFromUID(uid).data);
                let val: string = flag ? 'none' : 'block';
                document.querySelectorAll('li#expandrow')[0].setAttribute('style', 'display: ' + val + ';');
                val = !flag ? 'none' : 'block';
                document.querySelectorAll('li#collapserow')[0].setAttribute('style', 'display: ' + val + ';');
            }
        } else {
            let len = this.treegrid.element.querySelectorAll('.e-treegridexpand').length;
            if (len !== 0) {
                document.querySelectorAll('li#collapseall')[0].setAttribute('style', 'display: block;');
            } else {
                document.querySelectorAll('li#expandall')[0].setAttribute('style', 'display: block;');
            }
        }
    }
    applyChanges(applyFontChanges: boolean, applyBgChanges: boolean): void {
        debugger;
        /*   console.log(args);*/
        //let selectedColumn = <string>this.dropdown1.value;
        //let columnRef = this.treegrid.getColumnByField(selectedColumn);
        /*this.selectedColumnHeader. = <string>this.dropdown2.value;*/
        this.selectedColumn.minWidth = this.minimumWidthInput.value;
        this.selectedColumn.editType = this.dropdown2.value.toString();




        //columnRef.field.fontsize = <number>this.fontsize.value;
        /* columnRef.minWidth=*/

        /* columntoUpdate.editType = 'defaultedit';*/
        this.treegrid.refreshColumns();
        let columnDOM = document.querySelectorAll('[e-mappinguid="' + this.selectedColumn.uid + '"]')[0] as HTMLDivElement
        columnDOM.style.fontSize = this.fontsize.value + "px";
        if (applyFontChanges)
            columnDOM.style.color = this.fontColor.value
        if (applyBgChanges)
            columnDOM.style.backgroundColor = this.BgColor.value;
    }
    changeColumnType(args?: ChangeEventArgs): void {
        this.applyChanges(true, true);
    }
    minWidthfocusOut(args?: Object): void {
        this.applyChanges(true, true);
    }
    minWidthfocusIn(args?: Object): void {
        this.applyChanges(true, true);
    }
    changeFontSize(args?: Object): void {
        this.applyChanges(true, true);
    }
    changefontColor(args?: ColorPickerEventArgs): void {
        debugger;
        this.applyChanges(false, true);
        let columnDOM = document.querySelectorAll('[e-mappinguid="' + this.selectedColumn.uid + '"]')[0] as HTMLDivElement
        this.fontColor.value = args.currentValue.hex;
        columnDOM.style.color = args.currentValue.hex;
       

    }
    changeBgColor(args?: ColorPickerEventArgs): void {
        this.applyChanges(true, false);
        let columnDOM = document.querySelectorAll('[e-mappinguid="' + this.selectedColumn.uid + '"]')[0] as HTMLDivElement
        this.BgColor.value = args.currentValue.hex;
        columnDOM.style.backgroundColor = args.currentValue.hex;

    }
    changeAlignment(args?: Object): void {
        this.applyChanges(true,true);
    }
    columnHeaderChange(args?: ChangeEventArgs): void {
        debugger;
        //this.selectedColumn = this.treegrid.getColumnByField(args.value.toString());
        this.selectedColumn = <TreeGridColumn>this.treegrid.getColumnByField(args.value.toString());
        
        
    }


}

interface ContextMenuArgs extends MenuEventArgs {
    column: TreeGridColumn
}


