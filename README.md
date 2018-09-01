# How to run this site locally

This section is mainly copied from [http://kbroman.org/simple_site/pages/local_test.html](http://kbroman.org/simple_site/pages/local_test.html).

To test your site locally, you’ll need

- [ruby](https://www.ruby-lang.org/en/)
- the [github-pages](https://github.com/github/pages-gem) gem

## Install ruby

There are [lots of different ways to install ruby](https://www.ruby-lang.org/en/installation/).

In Mac OS X, older versions of ruby should already be installed. But you could use the [Ruby Version Manager (RVM)](https://rvm.io/) to have a more recent version. You could also use [Homebrew](https://brew.sh/).

In Windows, use [RubyInstaller](https://rubyinstaller.org/). (In most of this tutorial, I’ve assumed you’re using a Mac or some flavor of Unix. It’s possible that none of this was usable for Windows folks. Sorry!)

## Install the github-pages gem

Run the following command:

```
gem install github-pages
```

This will install the github-pages gem and all dependencies (including [jekyll](https://jekyllrb.com/)).

Later, to update the gem, type:

```
gem update github-pages
```

## Test your site locally

To construct and test your site locally, go into the directory and type

```
jekyll build
```

This will create (or modify) a `_site/` directory, containing everything from `assets/`, and then the `index.md` and all `pages/*.md` files, converted to html. (So there’ll be `_site/index.html` and the various `_site/pages/*.html`.)

Type the following in order to “serve” the site. This will first run build, and so it does not need to be preceded by jekyll build.

```
jekyll serve
```

Now open your browser and go to http://localhost:4000

# 如何在 [DAG fans](https://dagfans.org) 官网添加文章

本 github 仓库与 [DAG fans](https://dagfans.org) 官网直接对应。在本仓库中做的改动会立即体现在官网上（不过一般因为缓存的缘故，可能会有一段时间的延迟）。

在 DAG fans 官网上添加新文章的方法如下：

1. 在 [_post ](https://github.com/DAGfans/DAGfans.github.io/tree/master/_posts) 目录为新文章创建一份空白文件。文件名的形式必须是 yyyy-mm-dd-{title}.md，其中 {title} 是文章的标题。
2. 将文章内容全部粘贴进刚创建的文件中。
3. 在文件头部添加 yaml 格式的描述信息。如下面的例子所示：

```
---
layout: posts
categories:
 - Paper
image: https://user-images.githubusercontent.com/39436379/40726422-4edc1474-6458-11e8-81bd-c36e005d1037.jpg
title: "BYTEBALL:ABSTRACT"
tags:
 BYTEBALL
---
```

其中：

* layout 必须填 posts。
* categories 是文章所属的分类信息，比如论文的分类是 Paper。一篇文章可以属于多个分类。但是一般只填一个分类。
* image 是文章在首页显示用的封面图片的 URL。
* title 是文章标题，这个标题会体现在浏览器上面。也可以不填，不填的话则会采用文件名中的标题信息。如果填的话注意要加英文双引号。
* tag 是文章标签。一篇文章可以有多个标签。一边建议一篇文章至少要有一个专属的标签，方便筛选。

如果要新增分类或标签，必须提前注册。两者的注册方法类似。以新增分类为例。假设我们要新增一个名为 Test 的分类，则需要在 [_my_categories](https://github.com/DAGfans/DAGfans.github.io/tree/master/_my_categories) 目录下新建一份 md 文件，文件名必须是分类的名字。也就是说在我们的例子中要创建一份 Test.md。文件内容只有四行：

```
---
layout: archive
category: Test
---
```

其中 layout 必须为 archive。category 填上分类的名字即可。

标签的新增方法类似，只不过要在 [_my_tags](https://github.com/DAGfans/DAGfans.github.io/tree/master/_my_tags) 目录中创建相应的文件。

有一点需要注意的是，如果当前时间进入了新的年份或月份，则需要在 [_my_archives](https://github.com/DAGfans/DAGfans.github.io/tree/master/_my_archives) 目录下为新的年份创建一个新文件夹，为新的月份创建一个 md 文件。月份的 md 文件的内容可以参考 [https://github.com/DAGfans/DAGfans.github.io/blob/master/_my_archives/2018/05.md](https://github.com/DAGfans/DAGfans.github.io/blob/master/_my_archives/2018/05.md)。
