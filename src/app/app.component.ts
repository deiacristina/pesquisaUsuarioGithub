import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { GithubApiService } from './services/github-api.service';
import { Githubuser } from './interfaces/githubuser';
import { MatDialog } from '@angular/material/dialog';
import { DetailsComponent } from './components/details/details.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  public formGroup: FormGroup = this.fb.group({
    username: ['', Validators.required],
  });

  public user!: Githubuser;
  public listUsers: Githubuser[] = [];

  constructor(
    private fb: FormBuilder,
    private githubService: GithubApiService,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.getListUsers();

  }


  public getUser(): void {
    const username = this.formGroup.get('username')?.value


    if (username != undefined) {
      this.githubService.getUserService(username).subscribe(user => {
        this.user = user;
        this.listUsers?.push(this.user);
        this.saveListUsers(this.listUsers);
      })

    }

  }


  public saveListUsers(listUsers: Githubuser[]): void {
    localStorage.setItem("listUsers", JSON.stringify(listUsers));
  }



  public getListUsers(): void {
    if (localStorage.length > 0) {

      const listUsers: any = JSON.parse(localStorage.getItem("listUsers") as string);
      const conversao: Githubuser[] = listUsers as Githubuser[];
      this.listUsers = [...conversao];
    }
  }


  public deletUser(user: Githubuser): void {
    const indexItem: number = this.listUsers.indexOf(user);
    this.listUsers.splice(indexItem, 1);
    this.saveListUsers(this.listUsers);
  }

  public getDetails(user: Githubuser): void{
    this.dialog.open(DetailsComponent, {
      width: "650px",
      data: user
    })
  }

}
