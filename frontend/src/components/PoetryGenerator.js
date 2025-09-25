import React, { useState } from 'react';
import { Copy, Download, Wand2, Shuffle, Hash } from 'lucide-react';
import ThemeToggle from './ThemeToggle';
import axios from 'axios';
import { API_URL } from '../config/api';

const poetryGenres = [
  "Lyric Poetry", "Narrative Poetry", "Dramatic Poetry", "Satirical Poetry", "Light Verse",
  "Confessional Poetry", "Prose Poetry", "Speculative Poetry", "Concrete/Visual Poetry",
  "Abecedarian", "Acrostic", "Alexandrine", "Allegory", "Ballad", "Ballade", "Blank Verse",
  "Blues Poem", "Bop", "Cento", "Cinquain", "Couplet", "Dramatic Monologue", "Duplex",
  "Ekphrastic", "Elegy", "Epic", "Epigram", "Epitaph", "Erasure/Blackout", "Fable",
  "Found Poem", "Free Verse", "Ghazal", "Golden Shovel", "Haiku", "Idyll", "Limerick",
  "Ode", "Pantoum", "Pastoral", "Quatrain", "Rhymed Poetry", "Sestina", "Soliloquy",
  "Sonnet", "Tanka", "Terza Rima", "Triolet", "Villanelle", "Verse Drama", "Verse Novel"
];

const genreLineConstraints = {
  "Haiku": { min: 3, max: 3, recommended: 3, description: "Traditional 3-line structure (5-7-5)" },
  "Limerick": { min: 5, max: 5, recommended: 5, description: "5-line humorous poem" },
  "Cinquain": { min: 5, max: 5, recommended: 5, description: "5-line structured poem" },
  "Tanka": { min: 5, max: 5, recommended: 5, description: "Traditional 5-line Japanese poem" },
  "Sonnet": { min: 14, max: 14, recommended: 14, description: "14-line structured poem" },
  "Villanelle": { min: 19, max: 19, recommended: 19, description: "19-line poem with repeating refrains" },
  "Sestina": { min: 39, max: 39, recommended: 39, description: "39-line complex form" },
  "Epigram": { min: 1, max: 4, recommended: 2, description: "Short, witty saying" },
  "Epitaph": { min: 1, max: 8, recommended: 4, description: "Brief memorial text" },
  "Couplet": { min: 2, max: 2, recommended: 2, description: "2-line rhyming stanza" },
  "Quatrain": { min: 4, max: 4, recommended: 4, description: "4-line stanza" },
  "Triolet": { min: 8, max: 8, recommended: 8, description: "8-line poem with refrains" },
  "Ghazal": { min: 5, max: 15, recommended: 7, description: "5-15 couplets with refrain" },
  "Pantoum": { min: 8, max: 20, recommended: 12, description: "Interlocking quatrains" },
  "Ballade": { min: 28, max: 28, recommended: 28, description: "28-line French form" },
  "Terza Rima": { min: 9, max: 30, recommended: 14, description: "Interlocking triplets" },
  "Ode": { min: 10, max: 30, recommended: 18, description: "Formal lyrical poem" },
  "Elegy": { min: 10, max: 50, recommended: 20, description: "Mournful poem" },
  "Epic": { min: 20, max: 100, recommended: 40, description: "Long narrative poem" },
  "Ballad": { min: 12, max: 50, recommended: 24, description: "Narrative poem" },
  "Free Verse": { min: 1, max: 100, recommended: 16, description: "No structural constraints" },
  "Blank Verse": { min: 5, max: 100, recommended: 20, description: "Unrhymed iambic pentameter" },
  "Rhymed Poetry": { min: 4, max: 50, recommended: 16, description: "Rhyming poem" },
  "Narrative Poetry": { min: 8, max: 100, recommended: 24, description: "Story-telling poem" },
  "Lyric Poetry": { min: 4, max: 30, recommended: 16, description: "Personal expression" },
  "Dramatic Poetry": { min: 10, max: 50, recommended: 20, description: "Dramatic monologue" },
  "Satirical Poetry": { min: 4, max: 30, recommended: 12, description: "Humorous critique" },
  "Pastoral": { min: 8, max: 40, recommended: 20, description: "Rural life poem" },
  "Prose Poetry": { min: 1, max: 50, recommended: 15, description: "Poetic prose" },
  "Found Poem": { min: 5, max: 30, recommended: 12, description: "Collage from existing text" },
  "Concrete/Visual Poetry": { min: 3, max: 20, recommended: 8, description: "Visual arrangement" },
  "Blues Poem": { min: 12, max: 24, recommended: 16, description: "AAB rhyme pattern" },
  "Bop": { min: 12, max: 12, recommended: 12, description: "12-line structure" },
  "Cento": { min: 10, max: 30, recommended: 15, description: "Collage poem" },
  "Dramatic Monologue": { min: 15, max: 50, recommended: 25, description: "Character speech" },
  "Duplex": { min: 8, max: 20, recommended: 14, description: "Couplet form" },
  "Ekphrastic": { min: 8, max: 30, recommended: 16, description: "Art description" },
  "Erasure/Blackout": { min: 5, max: 25, recommended: 12, description: "Text removal" },
  "Fable": { min: 8, max: 24, recommended: 16, description: "Moral story" },
  "Golden Shovel": { min: 10, max: 30, recommended: 14, description: "Line-ending words" },
  "Idyll": { min: 8, max: 24, recommended: 16, description: "Peaceful scene" },
  "Soliloquy": { min: 12, max: 40, recommended: 20, description: "Inner thoughts" },
  "Verse Drama": { min: 20, max: 100, recommended: 40, description: "Dramatic verse" },
  "Verse Novel": { min: 30, max: 200, recommended: 60, description: "Novel in verse" },
  "Light Verse": { min: 4, max: 20, recommended: 8, description: "Humorous poem" },
  "Confessional Poetry": { min: 10, max: 40, recommended: 20, description: "Personal revelation" },
  "Speculative Poetry": { min: 8, max: 40, recommended: 20, description: "Imaginative themes" },
  "Abecedarian": { min: 26, max: 26, recommended: 26, description: "Alphabetical lines" },
  "Alexandrine": { min: 8, max: 30, recommended: 12, description: "12-syllable lines" },
  "Allegory": { min: 12, max: 50, recommended: 24, description: "Symbolic narrative" },
  "Acrostic": { min: 3, max: 20, recommended: 8, description: "First letters spell word" }
};

const getLineCountOptions = (genre) => {
  const constraints = genreLineConstraints[genre];
  if (!constraints) {
    return Array.from({ length: 20 }, (_, i) => i + 1);
  }
  
  return Array.from({ length: constraints.max - constraints.min + 1 }, (_, i) => constraints.min + i);
};

const getGenreStyling = (genre) => {
  const baseStyles = "min-h-96 resize-none font-serif leading-relaxed bg-gray-50 dark:bg-gray-800 border-0 w-full modern-scrollbar";
  
  switch (genre) {
    case "Haiku": return `${baseStyles} text-center text-xl tracking-wide`;
    case "Sonnet": return `${baseStyles} text-lg italic`;
    case "Limerick": return `${baseStyles} text-lg text-center`;
    case "Villanelle": return `${baseStyles} text-lg`;
    case "Free Verse": return `${baseStyles} text-lg`;
    case "Ballad": return `${baseStyles} text-lg`;
    case "Ode": return `${baseStyles} text-lg font-semibold`;
    case "Elegy": return `${baseStyles} text-lg text-gray-700 dark:text-gray-300`;
    case "Epic": return `${baseStyles} text-lg font-bold`;
    case "Ghazal": return `${baseStyles} text-lg text-right`;
    case "Tanka": return `${baseStyles} text-center text-lg`;
    case "Cinquain": return `${baseStyles} text-center text-lg`;
    case "Acrostic": return `${baseStyles} text-lg font-mono`;
    case "Concrete/Visual Poetry": return `${baseStyles} text-lg text-center whitespace-pre-line`;
    case "Blank Verse": return `${baseStyles} text-lg`;
    case "Rhymed Poetry": return `${baseStyles} text-lg`;
    case "Narrative Poetry": return `${baseStyles} text-lg`;
    case "Lyric Poetry": return `${baseStyles} text-lg italic`;
    case "Dramatic Poetry": return `${baseStyles} text-lg font-bold`;
    case "Satirical Poetry": return `${baseStyles} text-lg`;
    case "Pastoral": return `${baseStyles} text-lg text-green-800 dark:text-green-200`;
    case "Prose Poetry": return `${baseStyles} text-lg normal-case`;
    case "Epigram": return `${baseStyles} text-center text-lg font-semibold`;
    case "Epitaph": return `${baseStyles} text-center text-lg italic text-gray-600 dark:text-gray-400`;
    case "Found Poem": return `${baseStyles} text-lg font-mono`;
    case "Pantoum": return `${baseStyles} text-lg`;
    case "Sestina": return `${baseStyles} text-lg`;
    case "Terza Rima": return `${baseStyles} text-lg`;
    case "Triolet": return `${baseStyles} text-lg text-center`;
    case "Quatrain": return `${baseStyles} text-lg text-center`;
    case "Couplet": return `${baseStyles} text-lg text-center`;
    case "Blues Poem": return `${baseStyles} text-lg text-blue-800 dark:text-blue-200`;
    case "Bop": return `${baseStyles} text-lg`;
    case "Cento": return `${baseStyles} text-lg italic`;
    case "Dramatic Monologue": return `${baseStyles} text-lg`;
    case "Duplex": return `${baseStyles} text-lg`;
    case "Ekphrastic": return `${baseStyles} text-lg`;
    case "Erasure/Blackout": return `${baseStyles} text-lg bg-black text-white dark:bg-white dark:text-black`;
    case "Fable": return `${baseStyles} text-lg`;
    case "Golden Shovel": return `${baseStyles} text-lg`;
    case "Idyll": return `${baseStyles} text-lg text-green-700 dark:text-green-300`;
    case "Soliloquy": return `${baseStyles} text-lg italic`;
    case "Verse Drama": return `${baseStyles} text-lg font-bold`;
    case "Verse Novel": return `${baseStyles} text-lg`;
    case "Light Verse": return `${baseStyles} text-lg`;
    case "Confessional Poetry": return `${baseStyles} text-lg italic`;
    case "Speculative Poetry": return `${baseStyles} text-lg text-purple-800 dark:text-purple-200`;
    case "Abecedarian": return `${baseStyles} text-lg font-mono`;
    case "Alexandrine": return `${baseStyles} text-lg`;
    case "Allegory": return `${baseStyles} text-lg`;
    case "Ballade": return `${baseStyles} text-lg`;
    default: return `${baseStyles} text-lg`;
  }
};

const formatPoemByGenre = (poem, genre) => {
  if (genre === "Concrete/Visual Poetry") {
    return poem;
  }
  
  if (genre === "Haiku" || genre === "Tanka" || genre === "Cinquain") {
    return poem.split('\n').filter(line => line.trim()).join('\n');
  }
  
  if (genre === "Sonnet") {
    const lines = poem.split('\n').filter(line => line.trim());
    if (lines.length === 14) {
      return lines.slice(0, 4).join('\n') + '\n\n' +
             lines.slice(4, 8).join('\n') + '\n\n' +
             lines.slice(8, 12).join('\n') + '\n\n' +
             lines.slice(12).join('\n');
    }
  }
  
  return poem;
};

const PoetryGenerator = () => {
  const [keywords, setKeywords] = useState('');
  const [selectedGenre, setSelectedGenre] = useState('');
  const [lineCount, setLineCount] = useState('');
  const [generatedPoem, setGeneratedPoem] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSurpriseMe = () => {
    const randomGenre = poetryGenres[Math.floor(Math.random() * poetryGenres.length)];
    setSelectedGenre(randomGenre);
    
    const constraints = genreLineConstraints[randomGenre];
    if (constraints && constraints.recommended) {
      setLineCount(constraints.recommended.toString());
    } else {
      setLineCount('16');
    }
  };

  const handleGeneratePoem = async () => {
    if (!keywords.trim() || !selectedGenre) {
      alert('Please enter keywords and select a genre');
      return;
    }

    const constraints = genreLineConstraints[selectedGenre];
    const lineCountNum = parseInt(lineCount) || (constraints?.recommended || 16);
    
    if (constraints) {
      if (lineCountNum < constraints.min || lineCountNum > constraints.max) {
        alert(`For ${selectedGenre}, please choose between ${constraints.min} and ${constraints.max} lines. ${constraints.description}`);
        return;
      }
    }

    setIsLoading(true);
    try {
      const response = await axios.post(API_URL, {
        keywords: keywords.trim(),
        genre: selectedGenre,
        lineCount: lineCountNum
      });

      setGeneratedPoem(response.data.poem);
    } catch (error) {
      console.error('Error generating poem:', error);
      alert('Failed to generate poem. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(generatedPoem);
      alert('Poem copied to clipboard!');
    } catch (error) {
      console.error('Error copying to clipboard:', error);
    }
  };

  const handleDownload = () => {
    const blob = new Blob([generatedPoem], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `poem-${selectedGenre.toLowerCase().replace(/\s+/g, '-')}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="flex justify-between items-start mb-12">
        <div className="flex-1 text-center">
          <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 bg-clip-text text-transparent mb-4">
            AbiPoet
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            AI-Powered Poetry Generator with Keyword, Genre & Form Customization
          </p>
        </div>
        <div className="ml-4">
          <ThemeToggle />
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-5 gap-8">
        {/* Input Section */}
        <div className="lg:col-span-2 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-xl shadow-2xl hover:shadow-3xl transition-all duration-300 p-6 border border-purple-100 dark:border-purple-900">
          <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <Wand2 className="w-5 h-5 text-purple-600" />
            Create Your Poem
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Enter keywords and select a poetry form to generate a unique poem
          </p>
          
          <div className="space-y-6">
            {/* Keywords Input */}
            <div>
              <label className="block text-sm font-medium mb-2">Keywords</label>
              <input
                type="text"
                placeholder="Enter keywords (e.g., love, nature, stars...)"
                value={keywords}
                onChange={(e) => setKeywords(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white dark:bg-gray-700"
              />
            </div>

            {/* Genre Selection */}
            <div>
              <label className="block text-sm font-medium mb-2">Poetry Genre/Form</label>
              <select
                value={selectedGenre}
                onChange={(e) => {
                  setSelectedGenre(e.target.value);
                  const constraints = genreLineConstraints[e.target.value];
                  if (constraints && constraints.recommended) {
                    setLineCount(constraints.recommended.toString());
                  } else {
                    setLineCount('16');
                  }
                }}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white dark:bg-gray-700"
              >
                <option value="">Select a poetry form</option>
                {poetryGenres.map((genre) => (
                  <option key={genre} value={genre}>{genre}</option>
                ))}
              </select>
            </div>

            {/* Line Count Selection */}
            <div>
              <label className="block text-sm font-medium mb-2 flex items-center gap-2">
                <Hash className="w-4 h-4" />
                Number of Lines
                {selectedGenre && genreLineConstraints[selectedGenre] && (
                  <span className="text-xs text-gray-500 dark:text-gray-400">
                    ({genreLineConstraints[selectedGenre].min}-{genreLineConstraints[selectedGenre].max} lines)
                  </span>
                )}
              </label>
              <select
                value={lineCount}
                onChange={(e) => setLineCount(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white dark:bg-gray-700"
              >
                <option value="">Select number of lines</option>
                {selectedGenre && getLineCountOptions(selectedGenre).map((count) => (
                  <option key={count} value={count}>{count}</option>
                ))}
                {!selectedGenre && Array.from({ length: 20 }, (_, i) => i + 1).map((count) => (
                  <option key={count} value={count}>{count}</option>
                ))}
              </select>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3">
              <button
                onClick={handleGeneratePoem}
                disabled={isLoading}
                className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 text-white py-3 px-6 rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {isLoading ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                    Generating...
                  </>
                ) : (
                  <>
                    <Wand2 className="w-4 h-4" />
                    Generate Poem
                  </>
                )}
              </button>
              <button
                onClick={handleSurpriseMe}
                className="px-4 py-3 border border-purple-300 text-purple-600 rounded-lg hover:bg-purple-50 dark:hover:bg-purple-900/20 transition-all duration-300 flex items-center gap-2"
              >
                <Shuffle className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Output Section */}
        <div className="lg:col-span-3 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-xl shadow-2xl hover:shadow-3xl transition-all duration-300 p-6 border border-purple-100 dark:border-purple-900">
          <h2 className="text-xl font-semibold mb-4">Generated Poem</h2>
          
          {generatedPoem ? (
            <div className="space-y-4">
              <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
                <span>Genre: {selectedGenre}</span>
                <span>{generatedPoem.split('\n').filter(line => line.trim()).length} lines</span>
              </div>
              
              <textarea
                value={formatPoemByGenre(generatedPoem, selectedGenre)}
                readOnly
                className={getGenreStyling(selectedGenre)}
              />
              
              <div className="flex gap-3">
                <button
                  onClick={handleCopyToClipboard}
                  className="flex-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 py-2 px-4 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-all duration-300 flex items-center justify-center gap-2"
                >
                  <Copy className="w-4 h-4" />
                  Copy
                </button>
                <button
                  onClick={handleDownload}
                  className="flex-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 py-2 px-4 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-all duration-300 flex items-center justify-center gap-2"
                >
                  <Download className="w-4 h-4" />
                  Download
                </button>
              </div>
            </div>
          ) : (
            <div className="min-h-96 flex items-center justify-center text-gray-500 dark:text-gray-400">
              <div className="text-center">
                <Wand2 className="w-12 h-12 mx-auto mb-4 opacity-50" />
                <p>Your generated poem will appear here</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PoetryGenerator;