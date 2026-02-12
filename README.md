# Data Science Portfolio - Book Theme

A personal portfolio website with a book-style interface for showcasing data science projects and blog posts.

## Features

- 📖 Interactive book with page-flip animations
- 📱 Fully responsive (works on mobile and desktop)
- 🎨 Clean, professional design
- ⌨️ Keyboard navigation (arrow keys)
- 👆 Touch/swipe support for mobile
- 🚀 No build process - pure HTML/CSS/JS
- 📝 Easy to customize and add content

## Deployment to GitHub Pages

### Step 1: Create a GitHub Repository

1. Go to [GitHub](https://github.com) and create a new repository
2. Name it `yourusername.github.io` (replace `yourusername` with your actual GitHub username)
   - This makes it your main GitHub Pages site
   - Or use any name like `portfolio` for a project site

### Step 2: Upload Files

**Option A: Using GitHub Web Interface**
1. Click "uploading an existing file" on the repository page
2. Drag and drop these files:
   - `index.html`
   - `styles.css`
   - `script.js`
3. Commit the files

**Option B: Using Git Command Line**
```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/yourusername/yourusername.github.io.git
git push -u origin main
```

### Step 3: Enable GitHub Pages

1. Go to your repository Settings
2. Click "Pages" in the left sidebar
3. Under "Source", select "main" branch
4. Click "Save"
5. Your site will be live at `https://yourusername.github.io` in a few minutes!

## Customization Guide

### Change Your Name and Title

In `index.html`, find and replace:
- Line 14: Change `"Your Name - Data Science Portfolio"` to your actual name
- Line 21: Change `"Your Name"` in the subtitle

### Add Your Bio

In `index.html`, around line 33, edit the "About Me" section with your own information.

### Update Your Skills

Around line 39, modify the skills list to match your actual skills.

### Add Your Projects

Replace the three project items (starting around line 46) with your actual projects:
```html
<div class="project-item">
    <h3>Your Project Name</h3>
    <p>Brief description of what you did and found.</p>
    <a href="link-to-github" class="project-link">View Analysis →</a>
</div>
```

### Add Blog Posts

1. **Add to the blog list** (around line 69): Create a new blog-item div
2. **Create the full blog post pages**: Copy the blog post template (pages 6-7 or 10-11) and modify the content

To link a blog item to its full post:
```html
<div class="blog-item" onclick="goToPage(6)">
```
Change the number to match the page number where your full post lives.

### Change Colors

In `styles.css`:
- Line 8: Background gradient colors
- Line 31: Cover page colors  
- Line 87: Accent color (currently blue `#3498db`)

### Add More Pages

To add a new page:

1. In `index.html`, copy an existing page div:
```html
<div class="page" data-page="12">
    <div class="page-content left-page">
        <!-- Your content -->
    </div>
    <div class="page-content right-page">
        <!-- Your content -->
    </div>
</div>
```

2. Update the `data-page` number to be +2 from the previous page

## File Structure

```
your-repo/
├── index.html          # Main HTML file with all content
├── styles.css          # All styling and animations
├── script.js           # Page navigation logic
└── README.md          # This file
```

## Navigation

- **Arrow buttons**: Click ← → to flip pages
- **Keyboard**: Use arrow keys on desktop
- **Swipe**: Swipe left/right on mobile
- **Page dots**: Click any dot to jump to that page
- **Clickable items**: Blog items are clickable to jump to full posts

## Tips for Adding Content

### Writing Blog Posts

Keep your blog posts scannable:
- Use clear h3 headers for sections
- Break up text with lists
- Include specific numbers and findings
- End with links to your code/GitHub

### Project Descriptions

For each project:
- Start with the question you asked
- Briefly describe your data
- Highlight 2-3 key findings
- Link to the full analysis or code

### Images and Charts

To add images to your blog posts:
```html
<img src="path-to-image.png" alt="Description" style="width: 100%; margin: 20px 0;">
```

You can upload images to your repo or link to external images.

## Browser Support

Works in all modern browsers:
- Chrome/Edge
- Firefox
- Safari
- Mobile browsers

## License

Feel free to use this template for your own portfolio!

## Questions?

If something isn't working, check:
1. All three files are in the root directory
2. File names are exactly: `index.html`, `styles.css`, `script.js`
3. GitHub Pages is enabled in repository settings

---

Made for data scientists who want a portfolio without building a website from scratch 📊
