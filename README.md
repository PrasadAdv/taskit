# TaskIt

TaskIt is a simple task management tool that lets a user create and manage tasks.

## Table of Contents

- [TaskIt architecture](#taskit-architecture)
- [Local setup](#local-setup)
  - [Pre requisites](#pre-requisites)
  - [Installation](#installation)
- [User guide](#user-guide)

### <a id="taskit-architecture">TaskIt Architecture</a>

TaskIt is a Full stack application which uses React for frontend, Ruby on Rails for backend and MySQL for database.

### <a id="local-setup">Local setup</a>

- #### <a id="pre-requisites">Pre requisites</a>

  1. Ruby version: ^~3.3
  2. Rails: ^~7.1
  3. React version: ^~18
  4. Node version: 20.10.0
  5. MySQL version: ^~8

- #### <a id="installation">Installation</a>

  1. Make sure the pre-requisites are installed and up and running.
  2. Open a terminal.
  3. Clone the repository by running following command.
     `git clone git@github.com:PrasadAdv/taskit.git`
  4. Navigate inside the cloned repository folder.
  5. Run following commands one by one.

    ```
    bundle install
    bundle exec rake db:setup
    yarn install
    bundle exec rake assets:precompile
    bundle exec rails s
    ./bin/shakapacker-dev-server
    ```

  6. The Application is running on http://127.0.0.1:3000/ . You are ready to explore.

### <a id="user-guide">User guide</a>
Please visit [TaskIt User guide](././doc/user_guide.md) to know how TaskIt works.
