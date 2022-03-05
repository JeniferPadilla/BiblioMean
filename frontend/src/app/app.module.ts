import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './home/header/header.component';
import { FooterComponent } from './home/footer/footer.component';
import { RegisterComponent } from './home/register/register.component';
import { LoginComponent } from './home/login/login.component';
import { SaveBookComponent } from './board/save-book/save-book.component';
import { ListBookComponent } from './board/list-book/list-book.component';
import { RegisterUserComponent } from './admin/register-user/register-user.component';
import { ListUserComponent } from './admin/list-user/list-user.component';
import { UpdateUserComponent } from './admin/update-user/update-user.component';
import { RegisterRoleComponent } from './admin/register-role/register-role.component';
import { ListRoleComponent } from './admin/list-role/list-role.component';
import { UpdateRoleComponent } from './admin/update-role/update-role.component';
import { ListBookService } from './services/list-book.service';
import { BookService } from './services/book.service';
import { RoleService } from './services/role.service';
import { UserService } from './services/user.service';
import { TokenInterceptorService } from './services/token-interceptor.service';
import { AuthGuard } from './guard/auth.guard';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';

import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBarModule } from '@angular/material/snack-bar';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    RegisterComponent,
    LoginComponent,
    SaveBookComponent,
    ListBookComponent,
    RegisterUserComponent,
    ListUserComponent,
    UpdateUserComponent,
    RegisterRoleComponent,
    ListRoleComponent,
    UpdateRoleComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MatToolbarModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatSnackBarModule,
  ],
  providers: [
    BookService,
    RoleService,
    UserService,
    ListBookService,
    {
      provide:HTTP_INTERCEPTORS,
      useClass:TokenInterceptorService,
      multi:true,
    },
    AuthGuard,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
