<?php
namespace App\Http\Controllers;

use App\Models\Article;
use Illuminate\Http\Request;

class ArticleController extends Controller
{
    public function getArticlesByMood($mood)
    {
        // Récupérer les articles selon le mood
        $articles = Article::where('mood', $mood)->get();
        
        // Retourner la réponse au format JSON
        return response()->json($articles);
    }
}
