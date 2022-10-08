---
layout: default
title: Tiger Yu
description: CS Student at UCSB
---

<div class="row">
  <div class="col-5">

![Me at my birthday party in China.](/profile.jpg){:standalone onload="$(this).addClass('figure-img img-fluid rounded')"}

{::nomarkdown}
  {% include socials.html %}
{:/}

  </div>
  <div class="col">

# About me

I am a UCSB student majoring in computer science. I work on some CS projects during my free time.

# Education and Experience

{::nomarkdown}
  {% include education-and-experience.html %}
{:/}

  </div>
</div>

# RSA+AES encryption/decryption demo

I've always liked doing some coding projects during my free time, so I've created these two demos just for this page.

<script src="rsa-aes.js"></script>

{::nomarkdown}
  {% include rsa-aes.html %}
{:/}

## The code for both of these demos

- [JS](){:
  .nav-link
  .active
  #js-tab
  data-bs-toggle="tab"
  data-bs-target="#js-tab-pane"
  type="button"
  role="tab"
  aria-controls="js-tab-pane"
  aria-selected="true"
  style="text-decoration: none;"
  }
- [HTML](){:
  .nav-link
  #html-tab
  data-bs-toggle="tab"
  data-bs-target="#html-tab-pane"
  type="button"
  role="tab"
  aria-controls="html-tab-pane"
  aria-selected="false"
  style="text-decoration: none;"
  }
{: #code .nav .nav-tabs role="tablist" }

{::nomarkdown}
  <div class="tab-content" id="myTabContent">
    <div class="tab-pane fade show active" id="js-tab-pane" role="tabpanel" aria-labelledby="js-tab" tabindex="0">
      <pre><code id="js-code"></code></pre>
    </div>
    <div class="tab-pane fade" id="html-tab-pane" role="tabpanel" aria-labelledby="html-tab" tabindex="0">
      <pre><code id="html-code"></code></pre>
    </div>
  </div>
{:/}

<script>
  $(document).ready(async function () {
    $("ul#code > li").addClass('nav-item').attr('role', 'presentation');
console.log(await(await fetch("/rsa-aes.js")).text());
    $("code#js-code").text(await (await fetch("/rsa-aes.js")).text());
    $("code#html-code").text(await (await fetch("/rsa-aes.html")).text());
  });
</script>
