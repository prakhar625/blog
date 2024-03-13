---
title: The Ultimate Markdown Test
date: 2023-07-4
cover_image: ../videos/video2.mp4
---

# Ultimate Markdown Test Blog Post

Welcome to the **Ultimate Markdown Test Blog Post**! This post is designed to push the limits of markdown formatting and test the rendering capabilities of your compiler. Let's dive into the various cases and see how well your compiler handles them.


## youtube video embeds
<embed src="https://www.youtube.com/embed/nlDT0kmNnLg"></embed>

## Webpage emebeds
<embed src="https://en.wikipedia.org/wiki/Special:Random"></embed>


## A foldable accordian
<details>
  <summary>Click to expand/collapse</summary>

  Content inside the foldable section...
</details>

## Headings with Inline Formatting

# Heading 1 *with italic text* and **bold text**
## Heading 2 ~~with strikethrough~~ and ***bold italic***
### Heading 3 `with inline code` and [links](https://example.com)

## Nested Lists

1. First item
   - Subitem 1
     1. Nested subitem 1
     2. Nested subitem 2
   - Subitem 2
2. Second item
   1. Subitem 1
      - Nested subitem 1
        * Sub-nested item 1
        * Sub-nested item 2
      - Nested subitem 2
   2. Subitem 2

## Complex Links and Images

[Link with **bold** and *italic* text](https://example.com/bold_italic)

[![Alt text](https://www.jdinstitute.edu.in/media/2021/05/thumbnail-1.jpg)](https://www.jdinstitute.edu.in/media/2021/05/thumbnail-1.jpg)

## Code Blocks with Syntax Highlighting

```python
def fibonacci(n):
    if n <= 0:
        return []
    elif n == 1:
        return [0]
    elif n == 2:
        return [0, 1]
    else:
        fib = [0, 1]
        for i in range(2, n):
            fib.append(fib[i-1] + fib[i-2])
        return fib

print(fibonacci(10))
```

## Blockquotes with Nested Elements

> This is a blockquote.
>
> > This is a nested blockquote.
> >
> > - With a list item
> > - And another one
>
> Back to the first level.

## Tables with Inline Formatting

| Column 1 | Column 2 | Column 3 |
|----------|:--------:|----------:|
| *Italic* | **Bold** | ~~Strikethrough~~ |
| [Link](https://example.com) | `Inline code` | ***Bold Italic*** |

## Task Lists with Nested Items

- [x] Task 1
  - [x] Subtask 1
  - [ ] Subtask 2
    - [ ] Nested subtask 1
    - [x] Nested subtask 2
- [ ] Task 2

## Footnotes with Multiple References

This is a sentence with multiple footnotes.[^1][^2]

[^1]: First footnote.
[^2]: Second footnote.

Another reference to the first footnote.[^1]

## Escaped Characters

\*This is not italic\*

\`This is not inline code\`

\[This is not a link\](https://example.com)

---

That's it! The **Ultimate Markdown Test Blog Post** has come to an end. If your compiler can handle all these cases flawlessly, congratulations! You have a robust markdown rendering system. Feel free to modify and expand upon this test content to suit your specific needs.

Happy markdown testing!