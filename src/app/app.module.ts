import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { AppComponent } from "./app.component";
import { ColumnChooserService, TreeGridModule } from "@syncfusion/ej2-angular-treegrid";
import { NumericTextBoxModule, ColorPickerModule } from '@syncfusion/ej2-angular-inputs';
import { DropDownListComponent, DropDownListModule } from "@syncfusion/ej2-angular-dropdowns";
import {
  PageService,
  SortService,
  EditService,
  FilterService,
  ToolbarService,
  ResizeService,
  ReorderService,
  RowDDService,
  FreezeService,
  ContextMenuService 
} from "@syncfusion/ej2-angular-treegrid";
import { ButtonComponent, ButtonModule, CheckBoxComponent, CheckBoxModule } from "@syncfusion/ej2-angular-buttons";
import { DialogComponent, DialogModule } from "@syncfusion/ej2-angular-popups";

@NgModule({
    declarations: [AppComponent],
    imports: [BrowserModule, TreeGridModule, DropDownListModule, ButtonModule, CheckBoxModule, DialogModule, NumericTextBoxModule, ColorPickerModule],
  providers: [PageService, SortService,EditService,ToolbarService,ResizeService,ReorderService,RowDDService,FilterService,ContextMenuService,FreezeService,ColumnChooserService],
  bootstrap: [AppComponent]
})
export class AppModule {}
