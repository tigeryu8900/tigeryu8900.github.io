---
title: Tiger Yu
subtitle: CS Student at UCSB
description: CS Student at UCSB
layout: default
---

# Education and Experience by Year

This is a quick overview of my education and experience per year.

{::nomarkdown}
  {% include education-and-experience.html %}
{:/}

# Skills and Proficiencies

Here is a list of the skills I have and how proficient I am with those skills.

<div class="row">
<div class="col">

## Very proficient

- C
- C++
- CSS
- HTML
- JavaScript
- Markdown
- Node.js
- Puppeteer

## Proficient

- Bash
- Git
- Java
- Microsoft Excel
- SQL

</div>
<div class="col">

## Somewhat Proficient

- Assembly
  - Intel Assembly
  - MIPS Assembly
- CMake
- LaTeX
- Makefile
- p5.js
- Processing.js

## Some experience

- Amazon AWS
- AutoHotkey
- Docker
- React
- VBScript

## Little Experience

- Kubernetes
- Ruby

</div>
<div class="col">

![A zoomed-in and zoom-blurred image of React + TypeScript code.](/assets/code.png){:
  standalone
  style="width: 100%;"
  onload="$(this).addClass('figure-img img-fluid rounded')"
}

</div>
</div>

# Projects

This is a list of some of the projects I have worked on.

## [Static Trie-based Encoding](https://github.com/tigeryu8900/static-trie-based-encoding)

A Compressed Read-Only File Format for Fast Reading

![A visual representation of a trie data structure. Image courtesy to Wikimedia Commons](/assets/Trie_example.svg){:
  standalone
  style="width: 100%;"
  onload="$(this)
    .addClass('figure-img img-fluid rounded')
    .parent()
    .css("margin-left", "auto")
    .css("margin-right", "auto")
    .css("width", "50%")"
}

In a trie data structure, the parent nodes represent common prefixes, and to construct a string, we make a path from the
root node to one of the numbered nodes and concatenate the strings inside each node.

![A visual representation of a trie data structure with the arrows flipped.](/assets/Trie_flipped_example.svg){:
  standalone
  style="width: 100%;"
  onload="$(this)
    .addClass('figure-img img-fluid rounded')
    .parent()
    .css("margin-left", "auto")
    .css("margin-right", "auto")
    .css("width", "50%")"
}

This file format takes the trie data structure and flips the pointers. As a result, the string could be extracted
starting from a numbered node. This file format also keeps a list of pointers to these numbered nodes, so they could be
accessed easily.

By using this file format, I was able to compress NASA's weblogs by more than 50 percent.

## [Pangolin](https://github.com/tigeryu8900/CS50-2019/tree/cs50/problems/2019/x/project)

A proof-of-concept of a web proxy.

<div style="text-align: center;">
  <iframe width="560"
          height="315"
          src="https://www.youtube-nocookie.com/embed/NuUzK6P4uCo"
          title="YouTube video player"
          style="border: none;"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowfullscreen></iframe>
</div>

I recorded this video while in China, and since Google is blocked in China, I was able to demonstrate how this proxy
could bypass the firewall.

Since this proxy is web-based, I had to consider the different ways a site might make requests and redirect those
requests through the proxy. XMLHttpRequest (XHR) is one type of request that I couldn't get to work. One thing that
usually uses XHR is search suggestions, and as you can see in the video, no search suggestions show up when I typed
"wikipedia" in the search bar.

## [UCSB Course Auto-Picker](https://github.com/tigeryu8900/ucsb-course-auto-picker)

A Node.js script for automatically adding courses

![A demonstration of the program in action.](/assets/ucsb-course-auto-picker.gif){:
  standalone
  style="width: 100%;"
  onload="$(this)
    .addClass('figure-img img-fluid rounded')
    .parent()
    .css("margin-left", "auto")
    .css("margin-right", "auto")
    .css("width", "50%")"
}

This program uses Node.js and Puppeteer to automate selecting classes.

# Demos

I've always liked doing some coding projects during my free time, so I've created a few demos just for this page.

## RSA and AES encryption/decryption demos

These two demos show how symmetric encryption could encrypt text and how asymmetric encryption could be used along with
symmetric encryption, so we end up with public and private keys. You could paste in existing keys if you don't want to
generate new ones.

### AES

AES is a symmetric encryption algorithm, meaning that the same key is used to encrypt and decrypt.

<p class="codepen"
   data-height="400"
   data-default-tab="result"
   data-slug-hash="yLEOPXx"
   data-editable="true"
   data-user="tigeryu8900">
  <span>See the Pen <a href="https://codepen.io/tigeryu8900/pen/yLEOPXx">
  AES Demo</a> by tigeryu8900 (<a href="https://codepen.io/tigeryu8900">@tigeryu8900</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>

### RSA + AES

This demo uses AES to encrypt and decrypt, but encrypts and decrypts the AES key using RSA, so we end up with public and
private keys. The modulo is stated separately in this demo, but it is usually part of both the public and private keys.

We can't use RSA by itself because like most asymmetric encryption algorithms, RSA only supports fixed-length text while
AES supports any length of text.

<p class="codepen"
   data-height="400"
   data-default-tab="result"
   data-slug-hash="YzvqEOp"
   data-editable="true"
   data-user="tigeryu8900">
  <span>See the Pen <a href="https://codepen.io/tigeryu8900/pen/YzvqEOp">
  RSA + AES Demo</a> by tigeryu8900 (<a href="https://codepen.io/tigeryu8900">@tigeryu8900</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>

<style>
  p.codepen {
    height: 400px;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 2px solid;
    margin: 1em 0;
    padding: 1em;
  }

  div.cp_embed_wrapper {
    padding-top: 1%;
    padding-bottom: 1%;
  }
</style>

## Untangle Demo

Drag the vertices so that no edges intersect. The background will turn green when no edges intersect.

This demo uses p5.js and an algorithm for detecting intersections.

<p class="codepen"
   data-height="600"
   data-default-tab="result"
   data-slug-hash="jOKqKPW"
   data-editable="true"
   data-user="tigeryu8900">
  <span>See the Pen <a href="https://codepen.io/tigeryu8900/pen/jOKqKPW">
  Untangle</a> by tigeryu8900 (<a href="https://codepen.io/tigeryu8900">@tigeryu8900</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>

<script async src="https://cpwebassets.codepen.io/assets/embed/ei.js"></script>
