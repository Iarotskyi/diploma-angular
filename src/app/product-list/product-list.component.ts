import {Component, AfterViewChecked, ChangeDetectorRef} from '@angular/core';
import {DataService} from '../../services/data.service';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements AfterViewChecked {
  dataObserver: Observable<any>;
  iteration = 0;
  productAmount: number;
  logs: Array<any> = [{timeDifference: 0}];

  constructor(private dataService: DataService, private cd: ChangeDetectorRef) {
    this.initData_();
  }

  ngAfterViewChecked(): void {
    const timeDifference = performance.now() - this.logs[this.iteration].startTime;
    this.logs[this.iteration].timeDifference = Math.ceil(timeDifference) / 1000;
    this.logs[this.iteration].productAmount = this.productAmount;
    this.cd.detectChanges();
  }

  async getProducts(productAmount: number): Promise<any> {
    this.productAmount = productAmount;
    this.iteration++;
    this.logs[this.iteration] = {startTime: performance.now()};
    this.dataObserver = await this.dataService.getData(productAmount.toString());
  }

  clearLogs(): void {
    this.initData_();
  }

  private initData_(): void {
    this.iteration = 0;
    this.logs = [{timeDifference: 0}];
  }
}
