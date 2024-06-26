import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
// import { ToastrService } from 'ngx-toastr';
import { MainserviceService } from 'src/app/service/mainservice.service';

@Component({
  selector: 'app-get-data',
  templateUrl: './get-data.component.html',
  styleUrls: ['./get-data.component.css']
})
export class GetDataComponent implements OnInit {
  displayedColumns: string[] = [
    'date',
    'firstName',
    'lastName',
    'gender',
    'mobileNumber',
    'email_id',
    'age',
    'pan_number',
    'adhaar',
    'status',
    'view',
    'delete'
  ];
  dataSource = new MatTableDataSource<any>();
  // alldetailsSpinner=false;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  errorMsg: any
  length: any;
  pageIndex: any;
  pageSize: any;
  alldetailsSpinner=false;
  viewContactModal:any;
  constructor(private service:MainserviceService, private router:Router,private fromQueryParams: ActivatedRoute) { }
  // private toastr: ToastrService
  ngOnInit(): void {
    this.getAllData();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.data.length > 0) {
      this.dataSource.filter = filterValue.trim().toLowerCase();
      if (this.dataSource.filteredData.length === 0) {
        this.errorMsg = 'No Records Found for Searched Data';
      } else {
        this.errorMsg = null;
      }
    }
  }

  getAllData(){
    this.alldetailsSpinner = true;
    this.service.getData().subscribe((res: any = Object)=>{
      console.log(res);
     if(res){
      // this.toastr.success('Data fetched Successfully');
      this.alldetailsSpinner = false;
      this.dataSource.data = res;
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
     } else {
      this.alldetailsSpinner = false;
      this.errorMsg = 'No Data Found';
      // this.toastr.error('Something went wrong');
     }
    })
  }
  PageSize(data: any) {
    console.log(data);
    // data.length = this.length;
    this.pageSize = data.pageSize;
    this.pageIndex = data.pageIndex * data.pageSize;
  }

  onView(data:any){
    console.log(data)
    this.viewContactModal = data;
    this.goToaddDetailsComponent();
  }

  deleteData(data:any){
    // this.service.deleteData();
    console.log(data.id);
    const deletId = data.id;
    console.log(deletId);
    this.alldetailsSpinner = true;
    this.service.deleteData(deletId).subscribe((res)=>{
      if(res){
        this.alldetailsSpinner = false;
        this.getAllData();
      } else{
        this.alldetailsSpinner = false;
      }
    })
  }

  goToaddDetailsComponent(){
    this.router.navigate(['contact','create','add-data'],{
      queryParams: this.viewContactModal
    })
  }
}
