export interface Technology {
  id: string
  name: string
  category: 'frontend' | 'backend' | 'database' | 'cloud' | 'platform'
  color: string
}

export const technologies: Technology[] = [
  { id: 'react',      name: 'React',       category: 'frontend',  color: '#61DAFB' },
  { id: 'javascript', name: 'JavaScript',  category: 'frontend',  color: '#F7DF1E' },
  { id: 'python',     name: 'Python',      category: 'backend',   color: '#3776AB' },
  { id: 'django',     name: 'Django',      category: 'backend',   color: '#092E20' },
  { id: 'nodejs',     name: 'Node.js',     category: 'backend',   color: '#339933' },
  { id: 'mysql',      name: 'MySQL',       category: 'database',  color: '#4479A1' },
  { id: 'postgresql', name: 'PostgreSQL',  category: 'database',  color: '#336791' },
  { id: 'restapi',    name: 'REST APIs',   category: 'backend',   color: '#FF6C37' },
  { id: 'aws',        name: 'AWS',         category: 'cloud',     color: '#FF9900' },
  { id: 'wordpress',  name: 'WordPress',   category: 'platform',  color: '#21759B' },
  { id: 'shopify',    name: 'Shopify',     category: 'platform',  color: '#96BF48' },
]
