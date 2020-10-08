class Book {
    private title: string | undefined;
    private author: string | undefined;
    private rating: number | undefined;
    private content: string | undefined;
  
    setTitle(title: string) {
      this.title = title;
      return this;
    }
    setAuthor(author: string) {
      this.author = author;
      return this;
    }
    setRating(rating: number) {
      this.rating = rating;
      return this;
    }
    setContent(content: string) {
      this.content = content;
      return this;
    }
    getInfo() {
      return `A ${this.title} book is written by ${this.author} with ${
        this.rating
      } out of 5 stars`;
    }
  }
  
  console.log(
    new Book()
      .setTitle('Voyna i Mir')
      .setAuthor('Lev Tolstoy')
      .setRating(3)
      .setContent('A very long and boring book... Once ago...')
      .getInfo(),
  );